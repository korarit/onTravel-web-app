<script setup>
const props = defineProps({
    otpClose: {
        type: Function
    },
    show: {
        type: Boolean
    }
})
const otp_phone = ref({
    time_request: "",
    code_request: "",
})
const otp_email = ref({
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
                    <p class="text-center text-[32px] font-bold mb-4 select-none">ยืนยันตัวตนผ่าน OTP</p>

                    <p class="text-[20px] font-semibold mb-1 select-none">เลือกรับรหัส OTP ผ่านทาง</p>
                    <div class="flex justify-between">
                        <button class="py-2 w-[48%] rounded-md border border-black">
                            <p class="text-[24px] font-bold text-[#111111] leading-6">เบอร์โทรศัพท์</p>
                            <p class="mt-1 text-[18px] font-bold text-[#707070] leading-5">090-926-XXXX</p>
                        </button>
                        <button class="py-2 w-[48%] rounded-md border border-black bg-[#6166E7]">
                            <p class="text-[24px] font-bold text-white leading-5">Email</p>
                            <p class="mt-1 text-[18px] font-bold text-[#E9E9E9] leading-5">ontravel@xxxxxx</p>
                        </button>
                    </div>
                    <div class="flex justify-between my-5">
                        <p class="text-[20px] font-semibold leading-5 select-none">กรอก OTP ใน <span class="text-[#3CBC41] underline underline-offset-2">9:59</span> นาที</p>
                        <p class="text-[20px] font-semibold leading-5 select-none">CODE : <span class="text-[#3CBC41] underline underline-offset-2">QXYC12</span></p>
                    </div>
                    <div class="w-full h-[70px]">
                        <OTPInput :fields="6"/>
                    </div>
                    <div class="w-full my-6">
                        <p class="text-right text-[24px] font-semibold text-[#0277BD] leading-8">ขอรหัสอีกครั้งได้ใน 2:59</p>
                    </div>
                    <div class="w-full mb-[42px]"> 
                        <button class="w-full h-[60px] rounded-md bg-[#FF9800] shadow-sm shadow-[#00000074] text-[24px] font-semibold text-white">
                            ยืนยันรหัส OTP
                        </button>
                    </div>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>