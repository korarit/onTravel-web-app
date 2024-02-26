<script setup>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


//use dayjs plugin

dayjs.extend(utc);
dayjs.extend(timezone);


const props = defineProps({
    otpClose: Function,
    show: Boolean,
    otpData: Object,
    resend: Function
})

////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))
const showTrasition = ref(false)
watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })

function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.otpClose()
    }, 310);
}

//request otp time
const request_time = ref(600)
const request_minute = ref(0)
const request_second = ref(0)

function cooldownRequest(){
    let y = setInterval(function() {
        request_minute.value = Math.floor(request_time.value / 60);
        request_second.value = request_time.value % 60;

        request_time.value -= 1;
        if (request_time.value < 0) {
            clearInterval(y);
            request_time.value = 0;
        }
    } , 1000);
}

//expire time
const expire_minute = ref(0)
const expire_second = ref(0)

watch(() => props.otpData, () => {
    //คำนวณเวลาที่เหลือ จากเวลาที่ส่งมาเป็น millisecond

},{ immediate: true })

onMounted(() => {
    if (props.otpData.ExpireTime !== undefined && props.otpData.ExpireTime !== null) {

        let x = setInterval(function() {
            // Get current date
            const date = dayjs().tz('Asia/Bangkok');
            const now = date.valueOf();

            let distance = props.otpData.ExpireTime - now;

            expire_minute.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            expire_second.value = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(x);
            }
        } , 1000);

    }
    if(request_time.value !== 0){
        cooldownRequest()
    }

})


async function resendOTP(){
    if(request_time.value === 0){
        request_time.value = 600
        cooldownRequest()

        //ส่ง request otp ใหม่
        const otp = await resendOTP()
    }

}

const emit = defineEmits(['sendOTP'])
const otp_code = ref('')

function send(){
    if (otp_code.value.length < 6 && otp_code.value !== '') {
        alert('กรุณากรอกรหัส OTP ให้ครบ 6 หลัก')
        return
    }
    emit('sendOTP', otp_code.value)
    ModalClose()
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");
</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-lg h-fit w-[50%] 2xl:w-[35%]">
                <div class="modal-head h-[42px] w-[100%] pr-4 pt-4 flex justify-end">
                    <button @click="ModalClose()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[32px] font-bold cursor-pointer" />
                    </button>
                </div>
                <div class="modal-body w-[80%] mx-auto flex flex-col">
                    <p class="text-center text-[32px] font-bold mb-4 select-none">{{ language.modal.otp.title }}</p>

                    <p class="text-[20px] font-semibold mb-1 select-none">{{ language.modal.otp.send_phone }}</p>

                    <div class="flex justify-between my-5">
                        <p class="text-[20px] font-semibold leading-5 select-none">
                            {{ language.modal.otp.input_otp }}
                            <span class="text-[#3CBC41] underline underline-offset-2">{{ expire_minute }}:{{ expire_second }}</span> {{ language.modal.otp.minute }}
                        </p>
                        <p class="text-[20px] font-semibold leading-5 select-none">CODE : 
                            <span class="text-[#3CBC41] underline underline-offset-2">{{ otpData.OTPCode }}</span>
                        </p>
                    </div>
                    <div class="w-full h-[70px]">
                        <OTPInput v-model="otp_code" :fields="6"/>
                    </div>
                    <div class="w-full my-6">
                        <p class="text-right text-[24px] font-semibold text-[#0277BD] leading-8">{{ language.modal.otp.wait_resend }} {{ request_minute }}:{{ request_second }}</p>
                    </div>
                    <div class="w-full mb-[42px]"> 
                        <button @click="() => send()" class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            {{ language.modal.otp.button_confirm }}
                        </button>
                    </div>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>