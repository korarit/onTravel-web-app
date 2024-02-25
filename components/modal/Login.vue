<script setup>
const props = defineProps({
    LoginClose: Function,
    show: Boolean
})

////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))


const showTrasition = ref(false)

//ตรวจสอบว่า อักษรที่กรอกลงในช่อง password ต้องเป็นตัวอักษรภาษาอังกฤษ ตัวเลข หรือสัญลักษณ์ที่กำหนดไว้เท่านั้น
function filterPasswordInput(inputElement) {
    var inputValue = inputElement.target.value;
    var pattern = /^[A-Za-z0-9!@#$%^&*+?]+$/;

    var filteredValue = "";
    for (var i = 0; i < inputValue.length; i++) {
        if (pattern.test(inputValue[i])) {
        filteredValue += inputValue[i];
        }
    }

    inputElement.target.value = filteredValue;
}

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
        props.LoginClose()
    }, 310);
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");

input[type="password"]::-webkit-password-suffix,
input[type="password"]::-webkit-visible-password,
input[type="password"]::-ms-reveal {
    display: none !important;
}


</style>

<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-lg h-fit w-[40%] 2xl:w-[35%]">
                <div class="modal-head h-[48px] w-[100%] pr-5 pt-5 flex justify-end">
                    <button @click="ModalClose()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[32px] 2xl:text-[32px] font-bold cursor-pointer" />
                    </button>
                </div>
                <div class="modal-body w-[100%] flex flex-col">
                    <p class="text-[28px] 2xl:text-[30px] text-center leading-[34px] font-extrabold mb-5">{{ language.modal.login.title }}</p>
                    <div class="mx-auto relative w-[80%] h-[48px] 2xl:h-[50px]">
                        <input 
                            class="mx-auto w-full h-full pl-[4.1rem] text-[16px] 2xl:text-[18px] font-medium placeholder-[#909090] rounded-md shadow-inner shadow-[#8a8a8a] bg-[#d1d1d1] focus:outline-none" 
                            type="text" placeholder="Phone number / Email / Username"
                        />
                        <div class="absolute inset-y-0 left-0 pl-[1.4rem] flex items-center pointer-events-none">
                            <font-awesome-icon :icon="['fas', 'user']" class="text-[24px] 2xl:text-[26px]" />
                        </div>
                    </div>
                    <div class="mx-auto relative w-[80%] h-[50px] mt-5">
                        <input 
                            class="mx-auto w-full h-full pl-[4.1rem] text-[16px] 2xl:text-[18px] font-medium placeholder-[#909090] rounded-md shadow-inner shadow-[#8a8a8a] bg-[#d1d1d1] focus:outline-none" 
                            type="password" placeholder="Password"
                            @input="filterPasswordInput"
                        />
                        <div class="absolute inset-y-0 left-0 pl-[1.4rem] flex items-center pointer-events-none">
                            <font-awesome-icon :icon="['fas', 'lock']" class="text-[24px] 2xl:text-[26px]" />
                        </div>
                    </div>

                    <div class="mx-auto w-[80%] my-4 flex justify-between items-center">
                        <div class="h-6 w-fit flex items-center">
                            <input type="checkbox" id="terms" name="terms" value="terms" class="w-6 h-6 mr-2 accent-[#313131]">
                            <p class="text-[16px] 2xl:text-[18px] leading-4 font-medium text-[#0c0c0c] select-none">{{ language.modal.login.keep_login }}</p>
                        </div>

                        <p class="text-[16px] 2xl:text-[18px] leading-4 font-semibold text-[#0277BD] cursor-pointer select-none">{{ language.modal.login.forgot }}?</p>
                    </div>

                    <div class="mx-auto w-[80%] space-y-5">

                        <button
                            class="w-full h-[48px] 2xl:h-[50px] rounded-md bg-[#FFA624] hover:bg-[#d68923] shadow-md shadow-[#d0d0d0]  text-[22px] 2xl:text-[24px] font-bold  text-white focus:outline-none mb-5"
                        >
                            {{ language.modal.login.button_login }}
                        </button>

                        <NuxtLink to="/auth/register" @click="ModalClose" class="w-full">
                        <button
                            class="w-full h-[48px] 2xl:h-[50px] rounded-md bg-[#FF5722] hover:bg-[#F93E03] shadow-inner shadow-[#00000055] text-[22px] 2xl:text-[24px] font-bold text-white focus:outline-none"
                        >
                            {{ language.modal.login.button_register }}
                        </button>
                        </NuxtLink>

                    </div>

                    <div class="mx-auto w-[80%] flex justify-center items-center my-6">
                        <div class="w-[25%] h-[1px] bg-[#000000]"></div>

                        <div class="w-[30%]">
                            <p class="text-center text-[20px] font-bold leading-4">{{ language.modal.login.or }}</p>
                        </div>

                        <div class="w-[25%] h-[1px] bg-[#000000]"></div>
                    </div>

                    <div class="mx-auto w-[80%] space-y-5 mb-12">

                        <button
                            class="w-full h-[48px] 2xl:h-[50px]  flex items-center justify-center rounded-md bg-[#01579B] hover:bg-[#2b5884] shadow-inner shadow-[#0000007e] text-[18px] 2xl:text-[20px] font-bold text-white focus:outline-none"
                        >
                            <div class="w-[10%] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fab', 'facebook']" class="text-[30px]" />
                            </div>
                            <div class="w-[40%] text-left text-nowrap">
                                <p>{{ language.modal.login.facebook }}</p>
                            </div>
                        </button>

                        <button
                            class="w-full flex items-center justify-center h-[48px] 2xl:h-[50px]  rounded-md bg-[#fffefe] hover:bg-[#f5f4f4] shadow-inner shadow-[#0000002e] text-[18px] 2xl:text-[20px] font-bold text-black border-2 border-black focus:outline-none"
                        >
                            <div class="w-[10%] h-fit flex items-center justify-center">
                                <img src="/icon/google-icon.svg" class="w-[28px] h-[30px] mx-auto" alt="google_icon">
                            </div>
                            <div class="w-[40%] text-left text-nowrap">
                                <p>{{ language.modal.login.google }}</p>
                            </div>
                        </button>

                        <button
                            class="w-full flex items-center justify-center h-[48px] 2xl:h-[50px]  rounded-md bg-[#00B900] hover:bg-[#349f2e] shadow-inner shadow-[#00000058] text-[18px] 2xl:text-[20px] font-bold text-white focus:outline-none"
                        >
                            <div class="w-[10%] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fab', 'line']" class="text-[28px]" />
                            </div>
                            <div class="w-[40%] text-left text-nowrap">
                                <p>{{ language.modal.login.line }}</p>
                            </div>
                        </button>

                    </div>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>