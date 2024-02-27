<script setup lang="ts">
definePageMeta({
  layout: 'defaultmain',
  auth: 'auth'
});

// ข้อมูลที่ใช้ในการแสดงผล ความสนใจ
const interest = ref({
    adventure: true,
    nature: false,
    sea: true,
    history: false,
    eating: true,
    scenic: false
})

//เก็บค่าสำหรับแก้ไขข้อมูลใน fill
const edit = ref({
    username: false,
    name: false,
    lastname: false,
    email: false,
    password: false,
    phone: false,
    province: false
})

//เก็บค่าสำหรับแสดงผล ของรหัสผ่าน
const check_password = ref({
    more_8: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false
})

function editData(target: string) {
    //remove disabled
    if(edit.value[target as keyof typeof edit.value] === false){
    let input = document.getElementById(target);
    input?.removeAttribute('disabled');
    edit.value[target as keyof typeof edit.value] = true;
    }
}

function CancelData(target: string) {
    let input = document.getElementById(target);
    input?.setAttribute('disabled', 'true');
    edit.value[target as keyof typeof edit.value] = false;
}

function saveData(target: string) {
    let input = document.getElementById(target);
    input?.setAttribute('disabled', 'true');
    edit.value[target as keyof typeof edit.value] = false;
}

function editPassword(target: string) {
    //remove disabled
    if(edit.value[target as keyof typeof edit.value] === false){
        let input = document.getElementById(target);
        input?.removeAttribute('disabled');
        edit.value[target as keyof typeof edit.value] = true;
        if (input instanceof HTMLInputElement) {
            input.value = '';
        }
    }
}

const otpModalShow = ref(false);


function savePassword(target: string) {
    let input = document.getElementById(target);
    input?.setAttribute('disabled', 'true');
    edit.value[target as keyof typeof edit.value] = false;
    if (input instanceof HTMLInputElement) {
            input.value = '************************';
    }
    otpModalShow.value = true;
}

function CancelPassword(target: string) {
    let input = document.getElementById(target);
    input?.setAttribute('disabled', 'true');
    edit.value[target as keyof typeof edit.value] = false;
    if (input instanceof HTMLInputElement) {
            input.value = '************************';
        }
}


//เก็บค่าของรูปที่จะ crop
const image_crop = ref<any | null>(null);

//เงื่อนไขการแสดงร modal ของการ crop รูป
const ImageCropShow = ref<boolean>(false);

//เก็บค่าของรูปที่จะ crop
const profile_img = ref<string | null>(null);

//ฟังก์สำหรับส่งค่าไปยัง modal crop image
function profile_upload(event: any) {
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

//profile image blob
const profile_img_blob = ref<Blob | null>(null);

function CropImg(blob: Blob) {
    profile_img.value = URL.createObjectURL(blob);
    profile_img_blob.value = blob;

}

//otpdata
const otpData = ref<null | any>(null);

async function requestOTP(type:string, phone:string) {
    const otp = true;
    if (otp) {
        return otp;
    } else {
        return false;
    }
}

async function resendOTP() {
    var phone:any = document.getElementById('phone');
    if(phone){
    const OTP = await requestOTP('sms', phone.value);
    if (OTP) {
        otpData.value = OTP;
    }
    }
}


</script>

<template>
    <div class="container mx-auto px-4 py-4 lg:px-40 sm:w-[70%]">

        <!-- profile edit -->
        <div class="rounded-full h-[256px] w-[256px] mx-auto my-12 bg-cover bg-center flex items-end overflow-hidden" :style="{ backgroundImage: `url(${profile_img === null ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : profile_img})` }">
            <label 
                class="w-[100%] h-[30%] flex justify-center pt-[7%] space-x-2 cursor-pointer" 
                style="background-color: rgba(0, 0, 0, 0.517);"
                for="getFile"
            >
            <font-awesome-icon :icon="['fas', 'camera']" class="text-[30px] text-white" />
                <p class="text-[20px] font-bold text-white select-none">UPLOAD</p>
                </label>
                <input type='file' id="getFile" hidden @change="profile_upload" >
        </div>
        <label for="new" class="text-2xl font-bold text-[#01579B]">Profile</label>

            <!-- fill สำหรับแก้ไข Username -->
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="username" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">User name</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input 
                            type="text" id='username'
                            class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]"
                            value="omega1234azaza" placeholder="แก้ไข Username" disabled
                        >

                        <button 
                            v-if="edit.username === false"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center  rounded-e-lg hover:bg-slate-800"
                            @click="editData('username')"
                            >
                            แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[username] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('username')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('username')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fill สำหรับแก้ไข ชื่อ -->
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="name" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Name</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input 
                            type="text" id='name'
                            class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]"
                            value="Suphakit" placeholder="แก้ไขชื่อ" disabled>
                        <button
                            v-if="edit.name === false"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center rounded-e-lg hover:bg-slate-800"
                            @click="editData('name')"
                        >   
                            แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[name] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('name')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('name')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fill สำหรับแก้ไข นาสกุล -->
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="lastname" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Lastname</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input 
                            type="text" id='lastname'
                            class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]" 
                            value="Ranphol" placeholder="แก้ไขนามสกุล"
                            disabled>
                        <button 
                            v-if="edit.lastname === false"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center rounded-e-lg hover:bg-slate-800"
                            @click="editData('lastname')"
                        >
                            แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[lastname] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('lastname')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('lastname')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fill สำหรับแก้ไข Email -->
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="email" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Email</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input type="email" id='email'
                            class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]"
                            placeholder="แก้ไข Emial" value="supakit0920@gmail.com" disabled>
                        <button 
                            v-if="edit.email === false"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center rounded-e-lg hover:bg-slate-800"
                            @click="editData('email')"
                        >
                            แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[email] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('email')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('email')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fill สำหรับแก้ไข รหัสผ่าน -->
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="password" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Password</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input 
                            id="password"
                            type="password" 
                            class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]"
                            placeholder="แก้ไขรหัสผ่าน"
                            value="************************"
                            disabled >
                        <button 
                            v-if="edit.password === false"
                            @click="editPassword('password')"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center  rounded-e-lg hover:bg-slate-800"

                        >
                            แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[password] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelPassword('password')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="savePassword('password')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- แสดงเงื่อนไข ของรหัสผ่าน-->
            <div :class="`mb-6 select-none ${edit.password === false ? 'hidden' : 'md:flex'}`">
                <div class="w-[31%] min-[1700px]:w-[26%]"></div>
                <div class="w-full md:w-3/4 font-medium">

                    <!-- รหัสผ่านยาวเกิน 8 ตัว -->
                    <div :class="`flex items-center space-x-2 ${check_password.more_8 === false ? 'text-red-600' : 'text-green-600'}`">
                        <div>
                            <font-awesome-icon v-if="check_password.more_8 === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                            <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                        </div>
                        <p class="text-[22px] leading-5">At least 8 characters</p>
                    </div>

                    <!-- มีการใช้ตัวเลข -->
                    <div :class="`flex items-center space-x-2 ${check_password.number === false ? 'text-red-600' : 'text-green-600'}`">
                        <div>
                            <font-awesome-icon v-if="check_password.number === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                            <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                        </div>
                        <p class="text-[22px] leading-5">Contains a digit</p>
                    </div>

                    <!-- มีการใช้อักษรพิมพ์เล็กภาษาอังกฤษ -->
                    <div :class="`flex items-center space-x-2 ${check_password.lowercase === false ? 'text-red-600' : 'text-green-600'}`">
                        <div>
                            <font-awesome-icon v-if="check_password.lowercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                            <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                        </div>
                        <p class="text-[22px] leading-5">Contains a lowercase a - z letter</p>
                    </div>

                    <!-- มีการใช้อักษรพิมพ์ใหญ่ภาษาอังกฤษ -->
                    <div :class="`flex items-center space-x-2 ${check_password.uppercase === false ? 'text-red-600' : 'text-green-600'}`">
                        <div>
                            <font-awesome-icon v-if="check_password.uppercase === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                            <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                        </div>
                        <p class="text-[22px] leading-5">Contains a uppercase A - Z letter</p>
                    </div>

                    <!-- มีการใช้อักษรพิเศษ -->
                    <div :class="`flex items-center space-x-2 ${check_password.special === false ? 'text-red-600' : 'text-green-600'}`">
                        <div>
                            <font-awesome-icon v-if="check_password.special === false" :icon="['fas', 'xmark']" class="text-[32px]" />
                            <font-awesome-icon v-else :icon="['fas', 'check']" class="text-[32px]" />
                        </div>
                        <p class="text-[22px] leading-6">Contains a special character !@#$%^&*+?</p>
                    </div>

                </div>
            </div>
            
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="phone" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Phone Number</label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">
                        <input type="text" class="phone-icon py-3 px-3 pe-11 block w-full border-2 border-gray-950 bg-white rounded-s-lg text-[16px] font-medium placeholder:text-[18px] placeholder:font-medium disabled:bg-[#dbdbdb]"
                            value="090-000-0000" placeholder="Ex. 090xxxxxxx" disabled id='phone'>
                        <button 
                            v-if="edit.phone === false"
                            @click="editData('phone')"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center rounded-e-lg hover:bg-slate-800"
                        >
                            แก้ไข
                        </button>
                        
                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[phone] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('phone')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('phone')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        
            <div class="mb-6 mt-6 md:flex md:items-center">
                <label for="province" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4"></label>
                <div class="relative md:w-3/4">
                    <div class="flex rounded-lg shadow-sm">

                        <select name="province" id=""
                            class="py-3 px-3 pe-11 block w-full text-[16px] font-medium border-2 border-gray-950 rounded-s-lg disabled:bg-[#cacaca]"
                            disabled>
                            <option value="1" class="text-[16px] font-medium">พะเยา</option>
                        </select>

                        <!-- ปุ่มแก้ไข -->
                        <button 
                            v-if="edit.province === false"
                            @click="editData('province')"
                            type="button"
                            class="w-[21%] bg-black text-white font-bold text-lg inline-flex items-center justify-center rounded-e-lg hover:bg-slate-800"
                        >
                        แก้ไข
                        </button>

                        <!-- ปุ่มบันทึก / ยกเลิก แสดงเมื่อ edit[province] เป็น true  -->
                        <div class="w-[21%] flex items-center" v-else>
                            <button class="w-[50%] h-full bg-[#F23B3B] text-white text-lg hover:bg-red-600" @click="CancelData('province')">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-[20px]" />
                            </button>
                            <button class="w-[50%] h-full bg-[#01579B] text-white text-lg hover:bg-blue-900 rounded-r-lg" @click="saveData('province')">
                                <font-awesome-icon :icon="['fas', 'check']" class="text-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- ความชอบ -->
            <label for="" class="text-2xl font-bold  md:w-1/4 md:pr-4">INTERESTS</label>
            <div class="mb-6 mt-6 md:items-center justify-items-between  grid grid-cols-3 gap-10 text-center">

                    <!-- ถ้า adventure เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.adventure ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.adventure = !interest.adventure"
                    >
                        Adventure lover
                    </button>

                    <!-- ถ้า Nature เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.nature ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.nature = !interest.nature"
                    >
                        Nature
                    </button>

                    <!-- ถ้า sea เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.sea ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.sea = !interest.sea"
                    >
                        Sea
                    </button>

                    <!-- ถ้า history เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.history ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.history = !interest.history"
                    >
                        History
                    </button>

                    <!-- ถ้า eating เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.eating ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.eating = !interest.eating"
                    >
                        Eating lover
                    </button>

                    <!-- ถ้า scenic เป็น true ปุ่มเป็นสีเขียว -->
                    <button 
                        :class="`${interest.scenic ? 'bg-[#36ad2d]' : 'bg-[#C0410C]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.scenic = !interest.scenic"
                    >
                        Scenic lover
                    </button>
            </div>

            <div class="mt-6 md:items-center justify-center justify-items-stretch grid grid-cols-1 gap-10">
                <div class="relative flex py-5 items-center">
                    <div class="flex-grow border-t border-black"></div>
                    <span class="flex-shrink mx-4 text-black text-xl font-bold">เชื่อมต่อกับ</span>
                    <div class="flex-grow border-t border-black"></div>
                </div>
            </div>

            <!-- เชื่อมต่อกับ facebook -->
            <button 
                type="button"
                class="mx-auto mt-6 p-2 w-[80%] bg-[#01579B] text-white rounded-md shadow-inner flex items-center justify-center space-x-3"
            >
                <font-awesome-icon :icon="['fab', 'facebook']" class=" text-[38px]" />
                <span class="text-xl font-bold w-[30%] text-left">ยกเลิกเชื่อมกับ Facebook</span>
            </button>

            <!-- เชื่อมต่อกับ Google -->
            <button 
                type="button"
                class="mx-auto mt-6 p-2 w-[80%] bg-[#FFFFFF] text-black border-black border-2 border-solid rounded-md shadow-inner-2xl flex items-center justify-center space-x-3"
            >
                <img class="h-[38px]" src="https://cdn-icons-png.flaticon.com/256/2702/2702602.png" alt="">
                <span class="text-xl font-bold w-[30%] text-left">เชื่อมต่อกับ Google</span>
            </button>

            <!-- เชื่อมต่อกับ LINE -->
            <button 
                type="button"
                class=" mx-auto mt-6 p-2 w-[80%] bg-[#00B900] text-white rounded-md shadow-inner flex items-center justify-center space-x-3"
            >
                <font-awesome-icon :icon="['fab', 'line']" class="text-[38px]" />
                <span class="text-xl font-bold w-[30%] text-left">เชื่อมต่อกับ LINE</span>
            </button>

            <!-- ลบบัญชีผู้ใช้ -->
            <button 
                type="button"
                class="mx-auto mt-[60px] mb-16 p-2 w-[80%] bg-[#F23B3B] text-white rounded-md shadow-inner flex items-center justify-center space-x-3"
            >
                <font-awesome-icon :icon="['fas', 'trash-can']" class="text-[38px]" />
                <span class="text-xl font-bold w-[30%] text-left">ลบบัญชีผู้ใช้งาน</span>
            </button>
    </div>

    <!-- Modal OTP -->
    <div v-if="otpModalShow">
        <ModalOTP :otpClose="() => otpModalShow = false" :show="otpModalShow" :otpData="otpData" :resend="() => resendOTP()" />
    </div>

    <!-- Modal Image Crop -->
     <div v-show="ImageCropShow">
        <ModalImageCrop :ModalClose="() => ImageCropShow = false" :image="image_crop"  @imageOutput="CropImg" />
    </div>

</template>
<style scoped>
    body{
        background-color: #D9D9D9;
        font-family: 'Kanit', sans-serif;
    }
    .phone-icon {
        background: url(https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg) no-repeat scroll 7px 14px;
        background-color: #fff;
        background-size: 30px;  
        padding-left: 50px;
    }
    .phone-icon:disabled{
        background: url(https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg) no-repeat scroll 7px 14px;
        background-color: #dbdbdb;
        background-size: 30px;  
        padding-left: 50px;
    }
</style>