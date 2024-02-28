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
    document.getElementById('password-match').classList.remove("border-gray-950");
    event.target.classList.add("outline-red-600");
    document.getElementById("password-match-error").innerText = "Password not match";
    document.getElementById("password-match-error").classList.remove("hidden");
}
else {
    event.target.classList.remove("border-red-600");
    event.target.classList.remove("outline-red-600");
    document.getElementById('password-match').classList.add("border-gray-950");
    document.getElementById("password-match-error").innerText = "";
    document.getElementById("password-match-error").classList.add("hidden");
}
}


const emit = defineEmits(['SendForgetPassword','resetPassword'])

async function GetOTP() {
    //check password rule
    if (check_password.value.more_8 === false || check_password.value.number === false || check_password.value.lowercase === false || check_password.value.uppercase === false || check_password.value.special === false) {
        return
    }
    //check password match
    if (document.getElementById('password').value !== document.getElementById('password-match').value) {
        return
    }

    const data = await ForgetPasswordOTP(document.getElementById('phone').value)

    if (data != null) {
        emit('SendForgetPassword', data)
        emit('resetPassword', { 
            username: document.getElementById('phone').value, 
            new_password: document.getElementById('password').value,
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
                <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-xl h-fit w-[80dvw] lg:w-[60dvw] 2xl:w-[600px] p-6">
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
                            id="phone"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="เบอร์โทร" 
                        />
                        
                        <input 
                            type="password"
                            id="password"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="รหัสผ่านใหม่"
                            @input="filterPasswordInput"
                        />
                        <div>
                        <input 
                            type="password"
                            id="password-match"
                            class="w-full h-[56px] bg-[#EFEFEF] rounded-xl px-[12px] placeholder:text-xl placeholder:text-[#797979] border-2 border-black shadow-inner shadow-black/30 text-xl font-medium"
                            placeholder="ยืนยัน รหัสผ่านใหม่" 
                            @input="passwordMacth"
                        />
                        <p id="password-match-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
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

                <button @click="GetOTP()"
                    class="w-full h-[50px] rounded-xl px-[12px] py-[6px] mt-2 bg-[#FF9800] hover:bg-[#F19102] text-white text-2xl font-semibold">
                    เปลี่ยนรหัสผ่าน
                </button>
            </div>
        </Transition>

    </div>
</ClientOnly></template>