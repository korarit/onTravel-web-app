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
    otpError: String,
    resend: Function
})

const loading_status = ref(false)

watch(() => props.otpError, () => {
    if (props.otpError !== '') {
        loading_status.value = false
    }
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
    loading_status.value = true
    emit('sendOTP', otp_code.value)

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
                    <div class="w-full my-6" v-if="request_minute > 0">
                        <p class="text-right text-[24px] font-semibold text-[#0277BD] leading-8">{{ language.modal.otp.wait_resend }} {{ request_minute }}:{{ request_second }}</p>
                    </div>
                    <div class="w-full my-6" v-else>
                        <p class="text-right text-[24px] font-semibold text-[#0277BD] leading-8">{{ language.modal.otp.request_resend }}</p>
                    </div>



                    <div class="w-full mb-[42px]" v-if="loading_status == false"> 
                        <button @click="() => send()" class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            {{ language.modal.otp.button_confirm }}
                        </button>
                    </div>
                    <div class="w-full mb-[42px]" v-else-if="loading_status == true"> 
                        <button class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            <div role="status">
                                <svg aria-hidden="true" class="mx-auto w-8 h-8 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    </div>
                    <div class="w-full" v-else-if="otpError != ''">
                        <button @click="() => send()" class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            {{ language.modal.otp.button_resend }}
                        </button>
                    </div>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>