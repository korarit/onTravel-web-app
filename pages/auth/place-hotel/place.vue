<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
if (!process.server) {
    const { QuillEditor } = await import ('@vueup/vue-quill');
    const { vueApp } = useNuxtApp ();
    vueApp.component ('QuillEditor', QuillEditor);
}


definePageMeta({
  layout: 'defaultmain',
});

const dropfile_enter = ref(false);
const image_input_list = ref([]);
const image_name_list = ref([]);

const event_drop = ['dragenter', 'dragover', 'dragleave', 'drop'];
onMounted(() => {
    event_drop.forEach((event) => {
        document.addEventListener(event, (e) => {
            e.preventDefault();
        });
    });
});
onUnmounted(() => {
    event_drop.forEach((event) => {
        document.removeEventListener(event, (e) => {
            e.preventDefault();
        });
    });
});
function dropFile(e) {
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt.files;

    //check file type
    if (!files[0].type.startsWith("image")) {
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
        return;
    }

    let blobUrl = URL.createObjectURL(files[0]);
    
    // ตรวจสอบว่ามีรูปภาพนี้ใน image_input_list หรือไม่
    if (image_input_list.value.includes(blobUrl)) {
        alert("รูปภาพนี้มีอยู่แล้วในรายการ");
        return;
    }

    
    image_input_list.value.push(blobUrl);
    console.log(URL.createObjectURL(files[0]));

    console.log(image_input_list.value);
    dropfile_enter.value = false;
}

function uploadFile(event) {
    var file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
        alert('Please select image file');
        return;
    }
    image_input_list.value.push(URL.createObjectURL(file));
    image_name_list.value.push(file.name);
    console.log(image_input_list.value);
}
function removeImage(index) {
    image_input_list.value.splice(index, 1);
    image_name_list.value.splice(index, 1);
}
</script>
<template>
    <ClientOnly>
    <div>
        <div class="container mx-auto px-4 py-4 lg:px-40 mt-10">
            <form class="flex flex-col">
                <div>
                    <label for="new" class="text-2xl font-bold text-[#01579B]">ชื่อสถานที่</label>
                    <input type="text" id='name'
                        class="mt-3 py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg "
                        placeholder="ชื่อสถานที่">
                </div>
                <div class="mt-4">
                    <label for="info" class="text-2xl  font-bold text-[#01579B]">รายละเอียสถานที่</label>
                    <!-- <textarea id="info" rows="4" class="  block py-3 px-3 w-full  border-2 border-gray-950 rounded-lg "
                        placeholder="Write your thoughts here..."></textarea> -->
                        <div class="bg-white rounded-lg  border-2 border-black">
                            <ClientOnly>
                                <QuillEditor
                                    toolbar="essential"
                                    class="min-h-[250px] rounded-b-lg shadow-inner bg-white shadow-[#00000052]" 
                                />
                            </ClientOnly>
                        </div>

                </div>
                <div class="mt-8">
                    <div class="bg-white rounded-t-lg px-4 border-black border-x-2 border-t-2 w-full py-2 flex items-center">
                        <p for="upload" class="text-[24px] font-bold text-[#01579B]">อัพโหลดรูปภาพ</p>
                        <button class="ml-auto bg-[#F9A825] hover:bg-yellow-600 py-2 px-10 rounded-md text-white text-lg font-semibold cursor-pointer">
                            Upload File
                        </button>
                    </div>
                    <div
                        :class="`w-full ${dropfile_enter === true ? 'bg-gray-100' : 'bg-white'}  rounded-b-lg items-center justify-center flex flex-col border-x-2 border-b-2 border-gray-950 shadow-inner shadow-black/30 min-h-[248px]`"
                        @drop.prevent="dropFile" @dragover="dropfile_enter = true" @dragleave="dropfile_enter = false"
                    >

                        <div class="flex flex-col" v-if="dropfile_enter === false && image_input_list.length === 0">
                            <div  id="show" style="background-image: url('https://img2.pic.in.th/pic/Vectorupload.png');" class="w-[100px] h-[70px] bg-center bg-contain bg-no-repeat mx-auto select-none">
                            </div>
                            <div class="mx-auto text-[28px] text-[#A8A7A7] mt-2 select-none">Drop File Image Here</div>
                        </div>
                        <p v-else-if="dropfile_enter === true && image_input_list.length === 0" class="text-[36px] text-[#F9A825] select-none">Drop File To Here</p>
                        <div v-if="image_input_list.length > 0" class="relative h-fit w-full">

                            <div class="w-full grid grid-cols-3 gap-6 p-6">
                                <div class="relative rounded-md shadow-md shadow-black/30 w-full h-[200px]" v-for="(image, index) in image_input_list" :key="index">
                                    <button @click="removeImage(index)" class="absolute z-10 -top-4 -right-2 bg-red-600 rounded-lg h-8 w-8 flex justify-center items-center">
                                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[30px] text-white" />
                                    </button>
                                    <div class="absolute overflow-hidden rounded-md bg-contain bg-center bg-no-repeat bg-black w-full h-full" :style="`background-image: url('${image}')`">
                                        <!-- <img :src="image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  object-scale-down h-full "> -->
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <input id="file_input" type="file" class="hidden" multiple>
                    </div>
                   
                </div>
                <div class="mt-4">
                    <label for="new" class="text-2xl font-bold text-[#01579B] ">ช่องทางการติดต่อ</label>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="fb" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Facebook</label>
                        <div class="relative md:w-3/4">
                            <input type="text" id='fb'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="www.facebook.com">

                        </div>
                    </div>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="line" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Line</label>
                        <div class="relative md:w-3/4">
                            <input type="text" id='line'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="@xxxxx">

                        </div>
                    </div>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="phone" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">เบอร์โทรศัพท์</label>
                        <div class="relative md:w-3/4">
                            <input type="tel" id='phone'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="09xxxxxxxx">

                        </div>
                    </div>
                    <div class=" mt-6 md:flex md:items-center">
                        <label for="other" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">ช่องทางติดต่ออื่นๆ</label>
                        <div class="relative md:w-3/4">
                            <div class="bg-[#01579B] w-full py-4 text-white rounded-md text-xl text-center hover:bg-blue-900 cursor-pointer">
                                เพิ่มช่องทางการติดต่ออื่นๆ</div>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">ที่อยู่ของสถานที่</label>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <div
                            class="mb-2 md:w-1/4 md:pr-4 flex sm:items-start  sm:justify-start items-center justify-center">
                            <img class="h-[300px] "
                                src="https://assets.grab.com/wp-content/uploads/sites/10/2023/05/25185720/2-1.jpg">
                        </div>
                        <div class="relative md:w-3/4  flex flex-col justify-between h-[250px]">

                            <select name="province" id="province"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก จังหวัด</option>
                                <option value="">พะเยา</option>
                            </select>


                            <select name="District" id="District"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก อำเภอ</option>
                            </select>


                            <select name="Subdistrict" id="Subdistrict"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก ตำบล</option>
                            </select>



                        </div>

                    </div>
                </div>
                <div class="w-full h-[500px] bg-slate-400 items-center justify-center flex">
                    <p class="text-2xl">แผนที่</p>
                </div>
                
                <label for="" class="text-3xl font-bold mt-8  md:w-1/4 md:pr-4 text-[#01579B]">INTERESTS</label>
                <div class=" mt-4 md:items-center justify-items-between  grid grid-cols-3 gap-x-2 sm:gap-x-20 sm:gap-y-5  text-center">

                    <label for="Adventure"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Adventure lover
                    </label>

                    <label for="Nature"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Nature
                    </label>

                    <label for="Adventure"
                        class="bg-[#616161]  py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Sea
                    </label>

                    <label for="History"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        History
                    </label>

                    <label for="Eating"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Eating lover
                    </label>

                    <label for="Scenic"
                        class="bg-[#616161]  py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Scenic lover
                    </label>
                </div>
                <div class="my-8">
                    <button type="button"
                        class="mt-6 p-4 w-full bg-[#F9A825] hover:bg-yellow-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">สร้างบัญชีสถานที่</p>
                    </button>
                    <button type="button" class="mt-6 p-4 w-full bg-[#F93225] hover:bg-red-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">ยกเลิกสร้างบัญชีสถานที่</p>
                    </button>
                </div>
            </form>
        </div>
    </div>
</ClientOnly>   
</template>

<style>
body {
    background-color: #F5F5F5;
    font-family: 'Kanit', sans-serif;
}
.ql-toolbar.ql-snow{
    border: 1px solid borderColor;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
.ql-container .ql-snow{
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
.ql-formats{
    font: 2em sans-serif;
}

</style>