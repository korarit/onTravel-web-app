<script setup>
const props = defineProps({
    otpClose: {
        type: Function
    },
    show: {
        type: Boolean
    }
})

////////////////// แปลภาษา //////////////////////
const language = ref(inject('language'))

const otp_phone = ref({
    time_request: "",
    code_request: "",
})
const otp_type = ref("")

const showTrasition = ref(false)
watch(() => props.show, (value) => {
    if (value) {
        showTrasition.value = true
    }
})
function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.otpClose()
    }, 310);
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
                            กรอก OTP ใน {{ language.modal.otp.input_otp }}
                            <span class="text-[#3CBC41] underline underline-offset-2">9:59</span> {{ language.modal.otp.minute }}
                        </p>
                        <p class="text-[20px] font-semibold leading-5 select-none">CODE : 
                            <span class="text-[#3CBC41] underline underline-offset-2">QXYC12</span>
                        </p>
                    </div>
                    <div class="w-full h-[70px]">
                        <OTPInput :fields="6"/>
                    </div>
                    <div class="w-full my-6">
                        <p class="text-right text-[24px] font-semibold text-[#0277BD] leading-8">{{ language.modal.otp.wait_resend }} 2:59</p>
                    </div>
                    <div class="w-full mb-[42px]"> 
                        <button class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            {{ language.modal.otp.button_confirm }}
                        </button>
                    </div>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>