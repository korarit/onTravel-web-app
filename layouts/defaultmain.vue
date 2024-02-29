<script setup lang="ts">
const loginShow = ref<boolean>(false)
const profileShow = ref<boolean>(false)

function LoginModalShow() {
    loginShow.value = true
}
provide('LoginModalShow', LoginModalShow)

const language = ref<object>(await GetLanguge('th'));
const lang_code = ref<string>('th')

async function setLanguage(code: string) {
    language.value = await GetLanguge(code)

    lang_code.value = code
    console.log(language.value);
}

provide('language_code', lang_code)
provide('language', language)

const { data, status, signIn } = useAuth()


function closeProfile() {
    setTimeout(() => {
        profileShow.value = false
    }, 100);

}

const ForgetPasswordShow = ref<boolean>(false)
const otpModalShow = ref<boolean>(false)

const otpError = ref<string>('')

interface otpDataType {
    OTPCode: string
    NowTime: number
    ExpireTime: number
}

const otpData = ref<otpDataType>()
const setOTPData = (data: otpDataType) => {
    otpData.value = data
    ForgetPasswordShow.value = false
    setTimeout(() => {
        otpModalShow.value = true
    }, 400);
}

interface resetPasswordDataType {
    username: string
    new_password: string
}
const resetPasswordData = ref<resetPasswordDataType | null>()
const setResetPasswordData = (data: resetPasswordDataType) => {
    resetPasswordData.value = data
}


async function resetPassword(passOTP: string) {
    if (resetPasswordData.value == null) {
        return
    }
    if (otpData.value == null) {
        return
    }

    try{
        const res = await ResetPassword(resetPasswordData.value.username, passOTP, otpData.value.OTPCode, resetPasswordData.value.new_password)
        if (res === true) {
            otpModalShow.value = false
            try{
                const res = await signIn({
                    type: "phone",
                    username: resetPasswordData.value.username,
                    password: resetPasswordData.value.new_password
                })
                alert('Reset Password Success')
            }catch(e){
                alert('Reset Password Success')
            }
        }else{
            otpError.value = res
        }

    }catch(e){
        console.log(e)
    }
}

async function resendOTP() {
    if (resetPasswordData.value == null) {
        return
    }
    const res = await ForgetPasswordOTP(resetPasswordData.value['username'])
    if (res) {
        otpData.value = res
    }
}

</script>
<style>
body {
    background-color: #f0f0f0;
    overflow-y: hidden;
}

.modal-enter-active {
    transition: all 0.3s ease-out;
}
  
  .modal-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
  
.modal-enter-from,
.modal-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

</style>
<template>
    <div id="main" class="overflow-x-hidden overflow-y-auto h-[100dvh]">
        <div class="relative w-[100dvw] h-[70px]">
            <Navbar class="w-full absolute top-0" 
                :profileShow="profileShow" 
                :profileModal="() => profileShow = true"
                :profileModalClose="() => closeProfile()" 
                :LoginModal="() => loginShow = true" 
                :setLanguage="setLanguage" 
                :LoginStatus="status"
            />

            <div v-if="status == 'authenticated'">
                <Transition name="modal">
                <div v-if="profileShow" class="absolute -bottom-[220px] right-12 2xl:right-24 z-[100]">
                    <ModalProfile :modalClose="() => closeProfile()" />
                </div>
                </Transition>
            </div>
        </div>
        <slot />
        <div class="max-w-[100dvw]">
            <FooterWeb />
        </div>
        <div v-if="ForgetPasswordShow">
            <ModalForgetPassword :modalClose="() => ForgetPasswordShow = false" :show="ForgetPasswordShow" @SendForgetPassword="setOTPData" @resetPassword="setResetPasswordData" />
        </div>
        <div v-if="otpModalShow">
            <ModalOTP :otpClose="() => otpModalShow = false" :show="otpModalShow" @sendOTP="resetPassword" :otpError="otpError" :otpData="otpData" :resend="() => resendOTP()" />
        </div>

        <div v-if="loginShow">
            <ModalLogin :LoginClose="() => loginShow = false" :show="loginShow" :openForget="() => ForgetPasswordShow = true" />
        </div>
    </div>
</template>