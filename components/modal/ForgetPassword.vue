<script setup>

const props = defineProps({
    modalClose: Function,
    show: Boolean
})
////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))

const showTrasition = ref(false)
watch(() => props.show, () => {
    if (props.show) {
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
}, { immediate: true })

function ModalClose() {
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
    }, 320);
}

function inputError(id_element, text, error) {
    //eror is true
    if (error) {
        document.getElementById(id_element).classList.add("border-red-600");
        document.getElementById(id_element).classList.remove("border-gray-950");
        document.getElementById(id_element).classList.add("outline-red-600");
        document.getElementById(id_element + '-error').textContent = text;
        document.getElementById(id_element + '-error').classList.remove("hidden");
    }
    else {
        document.getElementById(id_element).classList.remove("border-red-600");
        document.getElementById(id_element).classList.remove("outline-red-600");
        document.getElementById(id_element).classList.add("border-gray-950");
        document.getElementById(id_element + '-error').textContent = "";
        document.getElementById(id_element + '-error').classList.add("hidden");
    }
}

//สำหรับเก็บค่าเงื่อนไขของ password
const check_password = ref({
    more_8: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false
})
//ฟังก์สำหรับเช็คความแข็งแรงของ password
function filterPasswordInput(inputElement) {
    filteredPassword(inputElement, check_password.value);
    inputError(inputElement.target.id, '', false);
}

function passwordMacth(event) {

filteredNoSpace(event, check_password.value);

var password = document.getElementById("password").value;
var inputValue = event.target.value;

//ถ้า password ไม่ตรงกับ confirm password จะแสดง error
if (inputValue !== password && inputValue !== "") {
    event.target.classList.add("border-red-600");
    document.getElementById('password-forget-password-match').classList.remove("border-gray-950");
    event.target.classList.add("outline-red-600");
    document.getElementById("password-forget-password-match-error").innerText = "Password not match";
    document.getElementById("password-forget-password-match-error").classList.remove("hidden");
}
else {
    event.target.classList.remove("border-red-600");
    event.target.classList.remove("outline-red-600");
    document.getElementById('password-forget-password-match').classList.add("border-gray-950");
    document.getElementById("password-forget-password-match-error").innerText = "";
    document.getElementById("password-forget-password-match-error").classList.add("hidden");
}
}

const loading_status = ref(false)

const emit = defineEmits(['SendForgetPassword','resetPassword'])


async function GetOTP() {
    //check password rule
    if (check_password.value.more_8 === false || check_password.value.number === false || check_password.value.lowercase === false || check_password.value.uppercase === false || check_password.value.special === false) {
        return
    }
    //check password match
    if (document.getElementById('password-forget-password').value !== document.getElementById('password-forget-password-match').value) {
        return
    }

    console.log(document.getElementById('phone_forget_password').value)

    loading_status.value = true
    const data = await ForgetPasswordOTP(document.getElementById('phone_forget_password').value)

    loading_status.value = false
    if (data != null) {
        emit('SendForgetPassword', data)
        emit('resetPassword', { 
            username: document.getElementById('phone_forget_password').value, 
            new_password: document.getElementById('password-forget-password').value,
        })

    } else {
        return
    }
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");
</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
                <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-xl h-fit w-[80dvw] lg:w-[50dvw] 2xl:w-[600px] p-6">
                    <!-- title -->
                    <div class="modal-head h-[48px] w-[100%] flex justify-between items-center mb-2">
                        <!-- title-->
                        <p class="text-[28px] text-center leading-[34px] font-semibold">ลืมรหัสผ่าน</p>
                        <button @click="ModalClose()">
                            <font-awesome-icon :icon="['fas', 'xmark']" class="text-[42px] font-bold cursor-pointer" />
                        </button>
                    </div>
                    <div class="flex flex-col space-y-4 mb-4 w-full">
                        <input 
                            type="text"
                            id="phone_forget_password"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="เบอร์โทร" 
                        />
                        
                        <input 
                            type="password"
                            id="password-forget-password"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="รหัสผ่านใหม่"
                            @input="filterPasswordInput"
                        />
                        <div>
                        <input 
                            type="password"
                            id="password-forget-password-match"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="ยืนยัน รหัสผ่านใหม่" 
                            @input="passwordMacth"
                        />
                        <p id="password-forget-password-match-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                        </div>
                    </div>

                    <div class="flex flex-col space-y-1 mb-4">
                        <div
                            :class="`flex items-center space-x-2 ${check_password.more_8 === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.more_8 === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">{{ language.page.register.password_condition.more_than_8 }}</p>
                        </div>
                        <div
                            :class="`flex items-center space-x-2 ${check_password.number === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.number === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">{{ language.page.register.password_condition.digit }}</p>
                        </div>
                        <div
                            :class="`flex items-center space-x-2 ${check_password.lowercase === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.lowercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">{{ language.page.register.password_condition.lowercase }}</p>
                        </div>
                        <div
                            :class="`flex items-center space-x-2 ${check_password.uppercase === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.uppercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">{{ language.page.register.password_condition.uppercase }}</p>
                        </div>
                        <div
                            :class="`flex items-center space-x-2 ${check_password.special === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.special === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-6">{{ language.page.register.password_condition.special }}</p>
                    </div>
                </div>

                <button v-if="loading_status === false" @click="GetOTP()"
                    class="w-full h-[50px] rounded-xl px-[12px] py-[6px] mt-2 bg-[#FF9800] hover:bg-[#F19102] text-white text-2xl font-semibold">
                    เปลี่ยนรหัสผ่าน
                </button>
                <button v-else class="w-full h-[48px] 2xl:h-[50px] rounded-md bg-[#FFA624] hover:bg-[#d68923] shadow-md shadow-[#d0d0d0]  focus:outline-none mb-5">
                    <div role="status">
                        <svg aria-hidden="true" class="mx-auto w-8 h-8 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
            </div>
        </Transition>

    </div>
</ClientOnly></template>