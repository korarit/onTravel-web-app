<script setup>
const props = defineProps({
    LoginClose: Function,
    openForget: Function,
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

const { signIn } = useAuth()

const username = ref('')
const password = ref('')
const loading_login = ref(false)

async function Login(e){
    var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@a-zA-Z0-9?(?:\\.a-zA-Z0-9?)*$/;
    var phone_regex = /^0[0-9]{9}$/;
    let is_phone = phone_regex.test(username.value);
    let is_email = email_regex.test(password.value);

    console.log("is_phone", is_phone);

    let type = '';
    if (is_phone) {
        type = 'phone';
    } else if (is_email) {
        type = 'email';
    }else{
        return;
    }

    e.preventDefault()

    const formData = reactive({
        type: type,
        username: username.value,
        password: password.value
    })
    if (formData.username == '' || formData.password == '') {
        return;
    }
    if (loading_login.value) {
        return;
    }
    try {
        loading_login.value = true
        let res = await signIn({...formData},{redirect: false})
        loading_login.value = false
        ModalClose()
        console.log("res", res);
    } catch (error) {
        console.log(error);
    }
}

function openForgetPassword(){
    ModalClose()
    setTimeout(() => {
        props.openForget()
    }, 400);
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
                            v-model="username"
                            class="mx-auto w-full h-full pl-[4.1rem] text-[16px] 2xl:text-[18px] font-medium placeholder-[#909090] rounded-md shadow-inner shadow-[#8a8a8a] bg-[#d1d1d1] focus:outline-none" 
                            type="text" placeholder="Phone number / Email"
                        />
                        <div class="absolute inset-y-0 left-0 pl-[1.4rem] flex items-center pointer-events-none">
                            <font-awesome-icon :icon="['fas', 'user']" class="text-[24px] 2xl:text-[26px]" />
                        </div>
                    </div>
                    <div class="mx-auto relative w-[80%] h-[50px] mt-5">
                        <input 
                            v-model="password"
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

                        <p @click="() => openForgetPassword()" class="text-[16px] 2xl:text-[18px] leading-4 font-semibold text-[#0277BD] cursor-pointer select-none">{{ language.modal.login.forgot }}?</p>
                    </div>

                    <div class="mx-auto w-[80%] space-y-5">

                        <button
                            @click="Login"
                            class="w-full h-[48px] 2xl:h-[50px] rounded-md bg-[#FFA624] hover:bg-[#d68923] shadow-md shadow-[#d0d0d0]  focus:outline-none mb-5"
                        >
                            <div role="status" v-if="loading_login">
                                <svg aria-hidden="true" class="mx-auto w-8 h-8 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div v-else class="text-[22px] 2xl:text-[24px] font-bold  text-white">
                                {{ language.modal.login.button_login }}
                            </div>
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