<style>
    @import url('~/assets/css/template.css');
    
    #phone {
        background: url(https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg) no-repeat scroll 7px 14px;
        background-size: 30px;
        background-color: white;
        padding-left: 50px;
    }

    body {
        background-color: #f0f0f0;
        font-family: 'Kanit', sans-serif;
    }

    select option {
        max-width: 100% ;
    }
</style>
<script setup>
//สำหรับ turnstile การเช็ค bot
const turnsite = ref(null);

//สำหรับเก็บค่าเงื่อนไขของ password
const check_password = ref({
    more_8: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false
})

//สำหรับเก็บค่าที่เลือกในการสนใจ
const interest = ref({
    adventure: false,
    nature: false,
    sea: false,
    history: false,
    eating: false,
    scenic: false
})

//เก็บค่า token ที่ได้จาก turnstile
const token_turnstile = ref(null);

//สำหรับเงื่อนไขการแสดง modal
const otpModalShow = ref(false);

//เก็บค่าของรูปที่จะ crop
const image_crop = ref(null);

//เงื่อนไขการแสดงร modal ของการ crop รูป
const ImageCropShow = ref(false);

//เก็บค่าของรูปที่จะ crop
const profile_img = ref(null);

//เก็บ status loading
const loadingRegister = ref(false);
const loadingStatus = ref('');

/*
    ฟังก์สำหรับแสดง Fill Error ของ input
    id_element = id ของ element ที่ต้องการแสดง error
    text = ข้อความที่ต้องการแสดง
    error = สถานะของ error ถ้าเป็น true จะแสดง error ถ้าเป็น false จะซ่อน error
*/
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

function inputNotEmply() {
    var username = document.getElementById("username"); //Element input username
    var name = document.getElementById("name"); //Element input name
    var lastname = document.getElementById("lastname"); //Element input lastname
    var email = document.getElementById("email"); //Element input email
    var phone = document.getElementById("phone"); //Element input phone
    var password = document.getElementById("password"); //Element input password
    var confirm_pass = document.getElementById("password-match"); //Element input confirm password
    var term_check = document.getElementById("terms"); //Element input checkbox

    /* 

    ถ้าช่องไหนว่างจะ windown scroll move 
    ไปยังอันนั้นๆโดยจะไปที่ละอันตามลำดับการเรียน

    */ 

    //check input username is empty
    if (username.value === "") {
        inputError("username", "Please enter your username", true);
        document.getElementById('main').scrollTo({ top: username.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input name is empty
    else if (name.value === "") {
        inputError("name", "Please enter your name", true);
        document.getElementById('main').scrollTo({ top: name.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input lastname is empty
    else if (lastname.value === "") {
        inputError("lastname", "Please enter your lastname", true);
        document.getElementById('main').scrollTo({ top: lastname.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input email is empty
    else if (email.value === "") {
        inputError("email", "Please enter your email", true);
        document.getElementById('main').scrollTo({ top: email.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input phone is empty
    else if (phone.value === "") {
        inputError("phone", "Please enter your phone", true);
        document.getElementById('main').scrollTo({ top: phone.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input password is empty
    else if (password.value === "") {
        inputError("password", "Please enter your password", true);
        document.getElementById('main').scrollTo({ top: password.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check input confirm password is empty
    else if (confirm_pass.value === "") {
        inputError("password-match", "Please enter your confirm password", true);
        document.getElementById('main').scrollTo({ top: confirm_pass.offsetTop, behavior: 'smooth' });
        return false;
    }
    //check term_check is not checked
    else if (term_check.checked === false) {
        document.getElementById('main').scrollTo({ top: term_check.offsetTop, behavior: 'smooth' });
        return false;
    }

    //check turnsile is verify
    else if (token_turnstile.value === null) {
        var turnstile_box = document.getElementById("turnstile-box");
        document.getElementById('main').scrollTo({ top: turnstile_box.offsetTop, behavior: 'smooth' });
        return false;
    }
    else {
        return true;
    }
}
//ฟังก์สำหรับเช็คความแข็งแรงของ password
function filterPasswordInput(inputElement) {
    filteredPassword(inputElement, check_password.value);
    inputError(inputElement.target.id, '', false);
}

//ฟังก์สำหรับว่าไม่มีการเว้นวรรค ใน input
function InputNoSpace(event) {
    filteredNoSpace(event);
    inputError(event.target.id, '', false);
}

//ในช่อง Phone input มีแค่การกรอกเลข
function filteredPhoneInput(event) {
    filteredPhoneNumber(event);
    inputError(event.target.id, '', false);
}

//ฟังก์สำหรับเช็คว่า password กับ confirm password ตรงกันหรือไม่
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

//ฟังก์สำหรับส่งค่าไปยัง modal crop image
function profile_upload(event) {
    var file = event.target.files[0];
    if (file) {
        //check file type is image
        if (file.type.split('/')[0] !== 'image') {
            alert('Please select image file');
            return;
        }
        if (image_crop.value) {
            URL.revokeObjectURL(image_crop.value);
        }
        const blob = URL.createObjectURL(file);
        var reader = new FileReader();
        reader.onload = (e) => {
            image_crop.value = blob;
            if (image_crop.value !== null) {
                ImageCropShow.value = true;
            }
            //console.log(this.profile_img);
        };
        reader.readAsArrayBuffer(file);
    }
}

function ImageChange(image) {
    profile_img.value = image;
}

async function CheckData() {
    let dataNotEmply = inputNotEmply();
    //password is macth
    var password = document.getElementById("password");
    var confirm_pass = document.getElementById("password-match");
    let password_match = false;
    let password_strength = false;

    //ส่งไปหา backend เพื่อเช็คว่ามีคำหยาบหรือไม่
    var username = document.getElementById("username");
    var name = document.getElementById("name");
    var lastname = document.getElementById("lastname");

    if (dataNotEmply && token_turnstile.value !== null) {

        if (check_password.value.more_8 === false || check_password.value.number === false || check_password.value.lowercase === false || check_password.value.uppercase === false || check_password.value.special === false) {
            inputError("password", "Password is not strong", true);
            document.getElementById('main').scrollTo({ top: password.offsetTop, behavior: 'smooth' });

            return
        }
        else if (password.value !== confirm_pass.value) {
            this.inputError("password-match", "Password not match", true);
            document.getElementById('main').scrollTo({ top: confirm_pass.offsetTop, behavior: 'smooth' });

            return
        } else {
            password_match = true;
            password_strength = true;
        }


        //loading
        loadingRegister.value = true;
        loadingStatus.value = 'AI กำลังตรวจสอบว่า ไม่มีคำหยาบคาย';

        // ส่งไปหา backend เพื่อเช็คว่ามีคำหยาบหรือไม่
        const check_inputContent = await TextContentSafety([username.value, name.value, lastname.value], this.token_turnstile);

        //loading end
        loadingRegister.value = false;
        loadingStatus.value = '';

        if (check_inputContent[0] === false) {
            inputError("username", "ไม่อนุญาติให้ใช้ คำหยาบ", true);
            document.getElementById('main').scrollTo({ top: username.offsetTop, behavior: 'smooth' });
            turnsite.value?.reset();
        }
        if (check_inputContent[1] === false) {
            inputError("name", "ไม่อนุญาติให้ใช้ คำหยาบ", true);
            if(check_inputContent[0] === true){
                document.getElementById('main').scrollTo({ top: name.offsetTop, behavior: 'smooth' });
                turnsite.value?.reset();
            }
        }
        if (check_inputContent[2] === false) {
            inputError("lastname", "ไม่อนุญาติให้ใช้ คำหยาบ", true);
            if(check_inputContent[0] === true && check_inputContent[1] === true){
                document.getElementById('main').scrollTo({ top: lastname.offsetTop, behavior: 'smooth' });
                turnsite.value?.reset();
            }
        }


        if (
            dataNotEmply === true && password_match === true &&
            password_strength === true && check_inputContent[0] &&
            check_inputContent[1] && check_inputContent[2]
        ) {
            otpModalShow.value = true;
        } else {
            console.log('ไม่ผ่าน');
        }
    }
    console.log(token_turnstile.value);
}


</script>
<template>
    <ClientOnly>
        <NuxtLayout name="defaultmain">
            <div class="mx-auto lg:px-40 w-[70%] 2xl:w-[60%]">
                <div class="rounded-full h-[256px] w-[256px] mx-auto my-12 bg-cover bg-center flex items-end overflow-hidden" :style="{ backgroundImage: `url(${profile_img === null ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : profile_img})` }">
                    <label 
                        class="w-[100%] h-[30%] flex justify-center pt-[7%] space-x-2 cursor-pointer" 
                        style="background-color: rgba(0, 0, 0, 0.517);"
                        for="getFile"
                    >
                        <font-awesome-icon :icon="['fas', 'camera']" class="text-[30px] text-white" />
                            <p class="text-[20px] font-bold text-white select-none">UPLOAD</p>
                    </label>
                    <input type='file' id="getFile" hidden @change="profile_upload">
                </div>
                <label for="new" class="text-[32px] font-semibold text-[#01579B]">New Account</label>
                <div class="mb-6 mt-6 md:flex md:items-center">
                    <label for="username" class="text-xl font-extrabold  mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Username</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="text" id="username" name="name"
                            class="w-full p-3 border border-gray-950 rounded-md shadow-inner text-lg font-medium"
                            placeholder="Enter your Username"
                            autocomplete="off"
                            @input="InputNoSpace"
                        />
                        <p id="username-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>
                <div class="mb-6 md:flex md:items-center ">
                    <label for="name" class=" text-xl font-extrabold  mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Name</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="text" id="name" name="name" 
                            class="w-full p-3 border border-gray-950 rounded-md text-lg font-medium "
                            placeholder="Enter your Name"
                            autocomplete="new-name"
                            @input="InputNoSpace"
                        />
                        <p id="name-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>
                <div class="mb-6 md:flex md:items-center">
                    <label for="lastname" class="text-xl  font-extrabold mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Last name</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="text" id="lastname" name="lastname"
                            class="w-full p-3 border border-gray-950 rounded-md text-lg font-medium" 
                            placeholder="Enter your Lastname"
                            autocomplete="new-lastname"
                            @input="InputNoSpace"
                        >
                        <p id="lastname-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>
                <div class="mb-6 md:flex md:items-center">
                    <label for="province" class="mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%] text-xl font-extrabold">&nbsp;&nbsp;Province</label>

                    <div class="w-full md:w-3/4 rounded-md bg-white">
                        <select 
                            name="province" id="province" 
                            class="w-full p-3 border border-gray-950 rounded-md text-xl font-medium  placeholder-[#3939397e] select-template bg-white"
                        >
                            <option value="" selected class="text-black">Select Province</option>
                            <option value="1" class="text-black">พะเยา</option>
                        </select>
                    </div>
                </div>
                <div class="mb-6 md:flex md:items-center">
                    <label for="email" class="text-xl font-extrabold  mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Email</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="email" id="email" name="email"
                            class="w-full p-3 border border-gray-950 rounded-md text-lg font-medium" 
                            placeholder="You@Example.com"
                            autocomplete="new-email"
                            @input="InputNoSpace"
                        />
                        <p id="email-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>
                <div class="mb-6 md:flex md:items-center">
                    <label for="phone" class="text-xl font-extrabold mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Phone</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="tel" id="phone" maxlength="10" autocomplete="off" 
                            class="w-full p-3 border border-gray-950 rounded-md " 
                            placeholder="+ 66"
                            @input="filteredPhoneInput"
                        />
                        <p id="phone-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                    
                </div>
                <div class="mb-6 md:flex md:items-center">
                    <label for="password" class="text-xl font-extrabold  mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%]"><b class="text-2xl text-red-600 leading-4">*</b>Password</label>
                    <div class="w-full md:w-3/4">
                        <input 
                            type="password" id="password" name="password"
                            class="w-full p-3 border border-gray-950 rounded-md text-lg font-medium" 
                            placeholder="Password"
                            pattern="[A-Za-z0-9!@#$%^&*+?]+"
                            @input="filterPasswordInput"
                        />
                        <p id="password-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>
                <div class="mb-2 md:flex md:items-center">
                    <label for="password-match" class="text-xl font-extrabold  mb-2 md:mb-0 w-[31%] min-[1700px]:w-[26%] "><b class="text-2xl text-red-600 leading-4">*</b>Confirm Password</label>
                    <div class="w-full md:w-3/4">
                    <input 
                        type="password" id="password-match" name="confirm_pass"
                        class="w-full p-3 border border-gray-950 rounded-md text-lg font-medium"
                        placeholder="Confirm Password"
                        pattern="[A-Za-z0-9!@#$%^&*+?]+"
                        @input="passwordMacth"
                    />
                    <p id="password-match-error" class="text-red-600 text-lg font-medium ml-2 hidden"></p>
                    </div>
                </div>

                <div class="mb-6 md:flex select-none">
                    <div class="w-[31%] min-[1700px]:w-[26%]"></div>
                    <div class="w-full md:w-3/4 font-medium">
                        <div :class="`flex items-center space-x-2 ${check_password.more_8 === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.more_8 === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">At least 8 characters</p>
                        </div>
                        <div :class="`flex items-center space-x-2 ${check_password.number === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.number === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">Contains a digit</p>
                        </div>
                        <div :class="`flex items-center space-x-2 ${check_password.lowercase === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.lowercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">Contains a lowercase a - z letter</p>
                        </div>
                        <div :class="`flex items-center space-x-2 ${check_password.uppercase === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.uppercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-5">Contains a uppercase A - Z letter</p>
                        </div>
                        <div :class="`flex items-center space-x-2 ${check_password.special === false ? 'text-red-600' : 'text-green-600'}`">
                            <div>
                                <font-awesome-icon v-if="check_password.special === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                                <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                            </div>
                            <p class="text-[22px] leading-6">Contains a special character !@#$%^&*+?</p>
                        </div>
                    </div>
                </div>

                <label for="" class="text-2xl font-extrabold  md:w-1/4 md:pr-4">INTERESTS</label>
                <div class="mb-6 mt-6 md:items-center justify-items-between  grid grid-cols-3 gap-8 text-center">
                    <button 
                        :class="`${interest.adventure ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.adventure = !interest.adventure"
                    >
                        Adventure lover
                    </button>
                    <button 
                        :class="`${interest.nature ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.nature = !interest.nature"
                    >
                        Nature
                    </button>
                    <button 
                        :class="`${interest.sea ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.sea = !interest.sea"
                    >
                        Sea
                    </button>
                    <button 
                        :class="`${interest.history ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.history = !interest.history"
                    >
                        History
                    </button>
                    <button 
                        :class="`${interest.eating ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.eating = !interest.eating"
                    >
                        Eating lover
                    </button>
                    <button 
                        :class="`${interest.scenic ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.scenic = !interest.scenic"
                    >
                        Scenic lover
                    </button>
                </div>
                <div class="my-8 md:flex md:items-center justify-center">
                    <input type="checkbox" id="terms" name="terms" value="terms" class="mr-5 w-6 h-6 accent-[##01579B]">
                    <label for="terms" class="text-center text-xl">I agree to be bound by the project <span
                            class="text-[#01579B]"><a href="#">service terms </a></span>See our <br><span
                            class="text-[#01579B]"><a href="">privacy policy </a></span>for more infomation</label>
                </div>

                <div class="mb-8 flex items-center justify-center" id="turnstile-box">
                    <NuxtTurnstile ref="turnsite" v-model="token_turnstile" lang="en" />
                </div>

                <div class="mb-12 mt-6 md:items-center justify-center justify-items-stretch grid grid-cols-1 gap-6">
                    <button 
                        class="bg-[#01579B] hover:bg-[#036DC2]  py-3 border border-solid border-cyan-500 rounded-xl text-white text-xl"
                        @click="CheckData()"
                    >
                        <div v-if="loadingRegister === false">สมัครสร้างบัญชี</div>
                        <div v-else>
                            <svg class="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24"></svg>
                            <p>{{ loadingStatus }}</p>
                        </div>
                    </button>
                    <button class="bg-[#d63e33] hover:bg-[#EF4236]  py-3 border border-solid border-red-700 rounded-xl text-white text-xl">
                        ยกเลิกการสมัคร
                    </button>

                </div>

            </div>
        </NuxtLayout>

        <div v-show="otpModalShow">
            <ModalOTP :otpClose="() => otpModalShow = false" :show="otpModalShow" />
        </div>

        <div v-show="ImageCropShow">
            <ModalImageCrop :ModalClose="() => ImageCropShow = false" :image="image_crop" :ImageChange="ImageChange" />
        </div>

    </ClientOnly>
</template>