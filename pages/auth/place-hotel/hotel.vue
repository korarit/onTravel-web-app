<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ThaiData from "~/assets/json/thailand_data.json"

definePageMeta({
  layout: 'defaultmain',
});

if (!process.server) {
    const { QuillEditor } = await import ('@vueup/vue-quill');
    const { vueApp } = useNuxtApp ();
    vueApp.component ('QuillEditor', QuillEditor);


}


////////////////////// แปลภาษา ///////////////////////
const language = ref(await inject('language'));
const lang_code = await inject('language_code');

const dropfile_enter = ref(false);
const image_input_list = ref<Array<string>>([]);

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

function dropFile(e: DragEvent) {
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt?.files;

    if (files) {
        for (var i = 0; i < files.length; ++i) {
        
            if (files[i].type.split('/')[0] !== 'image') {
                alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
                return;
            }

            image_input_list.value.push(URL.createObjectURL(files[i]));

        }
    }
    dropfile_enter.value = false;
}

function uploadFile(event: any) {
    var list_file = event.target.files;
    for (var i = 0; i < list_file.length; ++i) {
        
        if (list_file.item(i).type.split('/')[0] !== 'image') {
            alert('Please select image file');
            return;
        }

        image_input_list.value.push(URL.createObjectURL(list_file.item(i)));
    }

}

function removeImage(index: number) {
    image_input_list.value.splice(index, 1);
}

////////////////////////////// ตำแหน่งที่อยู่ //////////////////////////////
const selectedProvince = ref([]);
const selectedAmphoe = ref([]);
const selectedTambon = ref([]);

const handleProvince = async (value : any) => {
    if (value === null) {
        selectedProvince.value = [];
        selectedAmphoe.value = [];
        selectedTambon.value = [];
        return;
    }
    selectedProvince.value = await value['amphoes']
};
const handleAmphoe = async (value: any) => {
    if (value === null) {
        selectedAmphoe.value = [];
        selectedTambon.value = [];
        selectedTambon.value = [];
        return;
    }
    selectedAmphoe.value = await value['districts']
};
const handleTambon = async (value:any) => {
    selectedTambon.value = await value
};

const map = ref<any | null>(null);
const pin_object = ref<any | null>(null);

onMounted(async () => {
    const { L } = await import('leaflet');

    watch(selectedTambon, (newVal:any) => {
        if(newVal && newVal.latitude != undefined && map.value){
            console.log(map.value);
            map.value.leafletObject.flyTo([newVal.latitude, newVal.longitude], 16);
            if(pin_object.value){
                map.value.leafletObject.removeLayer(pin_object.value);
                pin_object.value = null;
            }
        }
        console.log(newVal);
    });
})
function ZoomIn() {
    let zoom_level = map.value.leafletObject.getZoom();
    map.value.leafletObject.setZoom(zoom_level + 1);
    console.log(zoom_level);
}
function ZoomOut() {
    let zoom_level = map.value.leafletObject.getZoom();
    map.value.leafletObject.setZoom(zoom_level - 1);
    console.log(zoom_level);
}

function addPin(){
    let center = map.value.leafletObject.getCenter();

    let icon = L.icon({
        iconUrl: '/icon/location-pin.png',
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    if(pin_object.value){
        map.value.leafletObject.removeLayer(pin_object.value);
        pin_object.value = null;
    }
    pin_object.value = L.marker(center, {icon: icon, draggable: true}).addTo(map.value.leafletObject);
}

//สำหรับแสดง modal ของ social media
const socialModalShow = ref(false);
const socialList = ref([
    {
        name: 'facebook',
        placeholder: 'Facebook URL',
        icon: ['fab', 'square-facebook']
    },
    {
        name: 'Line',
        placeholder: 'Line ID',
        icon: ['fab', 'square-line']
    },
    {
        name: 'phone',
        placeholder: 'Phone Number',
        icon: ['fas', 'square-phone']
    }
])

//add social media
const addSocialMedia = (value:any) => {
    socialList.value.push(value);
    console.log(socialList.value);
}
const removeSocialMedia = (index:any) => {
    socialList.value.splice(index, 1);
}


const list_facilitate = ref(['', '', ''])
watch(list_facilitate, (newVal:any) => {
    console.log(newVal, 'newVal');
})

const addFacilitate = () => {
    list_facilitate.value.push('');
}

const valueFacilitate = (index:number, value:any) => {
    list_facilitate.value[index] = value;
    console.log(list_facilitate.value);
}

const removeFacilitate = (index:any) => {
    list_facilitate.value.splice(index, 1);
}

</script>
<template>
    <ClientOnly>
    <div>
        <div class="container mx-auto px-4 py-4 lg:px-40 mt-10">
            <div class="flex flex-col">
                <div>
                    <label for="new" class="text-2xl font-bold text-[#01579B]">ชื่อที่พัก</label>
                    <input type="text" id='name'
                        class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg "
                        placeholder="ชื่อสถานที่">
                </div>
                <div class="mt-6">
                    <label for="info" class="text-2xl  font-bold text-[#01579B]">รายละเอียดที่พัก</label>
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

                <label for="hotel" class="text-2xl mt-6 font-bold text-[#01579B]">ประเภทโรงแรม</label>
                <select name="hotel" id="hotel"
                    class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                    <option disabled selected>ประเภทโรงแรม</option>

                </select>

                <div class="mt-10">
                    <UploadImage />
                </div>

                <div class="mt-8">
                    <label for="new" class="text-2xl font-bold text-[#01579B] ">ช่องทางการติดต่อ</label>
                    <div class="mb-6 mt-6 md:flex md:items-center" v-for="(contact, index) in socialList" :key="index">
                        <label for="fb" class="text-xl font-bold mb-2 md:my-auto md:w-1/4 md:pr-4">{{ contact.name }}</label>


                        <div class="relative md:w-3/4 h-[54px] w-full">
                            <input 
                                type="tel" id='phone'
                                class="absolute h-full px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                :placeholder="contact.placeholder"
                            >
                            <button @click="removeSocialMedia(index)" class="absolute right-0 h-full px-3 bg-red-500 hover:bg-red-600 border-2 border-black rounded-r-lg">
                                <font-awesome-icon :icon="['fas', 'trash']" class="text-[24px] text-white" />
                            </button>
                        </div>
                    </div>
                    
                    <div class=" mt-6 md:flex md:items-center">
                        <label for="other" class="text-xl font-bold mb-2 md:my-auto md:w-1/4 md:pr-4">ช่องทางติดต่ออื่นๆ</label>
                        <div class="relative md:w-3/4">
                            <button @click="() => socialModalShow = true" class="bg-[#01579B] w-full py-3 text-white rounded-md text-xl text-center hover:bg-blue-900 cursor-pointer">
                                เพิ่มช่องทางการติดต่ออื่นๆ
                            </button>
                        </div>
                    </div>

                </div>

                <div class="mt-8">
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">ที่อยู่ของสถานที่</label>
                    <div class="mb-6 mt-2 md:flex md:items-center">
                        <div
                            class="mb-2 md:w-1/4 md:pr-4 flex sm:items-start  sm:justify-start items-center justify-center">
                            <img class="h-[300px] "
                                src="https://assets.grab.com/wp-content/uploads/sites/10/2023/05/25185720/2-1.jpg">
                        </div>
                        <div class="relative md:w-3/4  flex flex-col justify-between h-[250px]" v-if="ThaiData.length != undefined ">

                            <AutoComplete 
                                @chosen="handleProvince"
                                :data="ThaiData"
                                :disable="ThaiData.length > 0 ? false : true"
                                search_key="province_name_th"
                                placeholder="โปรดเลือก จังหวัด"
                                inputClass="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold disabled:bg-[#CFCFCF] disabled:placeholder:text-[#777777]"
                            />

                            <AutoComplete :data="selectedProvince"
                                @chosen="handleAmphoe"
                                :disable="selectedProvince.length > 0 ? false : true"
                                search_key="amphoe_name_th"
                                placeholder="โปรดเลือก อำเภอ"
                                inputClass="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold disabled:bg-[#CFCFCF] disabled:placeholder:text-[#777777]"
                            />

                            <AutoComplete :data="selectedAmphoe"
                                @chosen="handleTambon"
                                :disable="selectedAmphoe.length > 0 ? false : true"
                                search_key="district_name_th"
                                placeholder="โปรดเลือก ตำบล"
                                inputClass="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold disabled:bg-[#CFCFCF] disabled:placeholder:text-[#777777]"
                            />



                        </div>

                    </div>
                </div>
                <div class="w-full h-[500px] bg-slate-400 relative border-2 border-black rounded-lg overflow-hidden">
                    <button @click="addPin" class="absolute bottom-10 left-8 h-16 w-16 bg-white rounded-lg z-10 flex items-center justify-center" >
                        <font-awesome-icon :icon="['fas', 'location-dot']" class="text-[42px] text-red-500" />
                    </button>

                    <div class="flex flex-col space-y-4 absolute bottom-10 right-8">
                        <button @click="ZoomIn" class=" h-16 w-16 bg-white rounded-lg z-10 flex items-center justify-center" >
                            <font-awesome-icon :icon="['fas', 'plus']" class="text-[48px]" />
                        </button>
                        <button @click="ZoomOut" class=" h-16 w-16 bg-white rounded-lg z-10 flex items-center justify-center" >
                            <font-awesome-icon :icon="['fas', 'minus']" class="text-[48px] " />
                        </button>
                    </div>


                    <div class="absolute w-full h-full z-0">
                        <ClientOnly>
                        <LMap
                            class="w-full h-full"
                            ref="map"
                            :zoom="16"
                            :maxZoom="18"
                            :center="[19.02785403084483, 99.89940151921624]"
                        >
                        <LTileLayer
                            url="http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
                            attribution="&amp;copy; <a href=&quot;https://www.google.com/maps&quot;>Google Map</a> contributors"
                            :subdomains="['mt0', 'mt1', 'mt2', 'mt3']"
                            name="GoogleMap"
                        />
                        </LMap>
                        </ClientOnly>
                    </div>
                </div>

                <div class="mt-8">
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">บริการที่มี</label>
                    <div class="flex mt-5 justify-between">
                        <div class="flex">
                            <input id='security' type="checkbox" class='w-7 h-7 mr-2'>
                            <label for="security"
                                class="ms-2 text-xl font-bold text-gray-900 dark:text-gray-300 ">ความปลอดภัย</label>
                        </div>
                        <div class="flex item-center">
                            <input id='food' type="checkbox" class='w-7 h-7 item-center'>
                            <label for="food" class="ms-2 text-xl font-bold text-gray-900 dark:text-gray-300">อาหาร</label>
                        </div>
                        <div class="flex item-center">
                            <input id='checkin' type="checkbox" class='w-7 h-7'>
                            <label for="checkin" class="ms-2 text-xl font-bold text-gray-900 dark:text-gray-300">เช็คอิน
                                24 ชั่วโมง</label>
                        </div>
                        <div class="flex item-center items-stretch">
                            <input id='driver' type="checkbox" class='w-7 h-7'>
                            <label for="driver"
                                class="ms-2 text-xl font-bold text-gray-900 dark:text-gray-300">รับส่ง</label>
                        </div>

                    </div>

                </div>

                <!-- รายการสิ่งอำนวยความสะดวก -->
                <div class="mt-8">
                    <label for="new" class="text-2xl font-bold text-[#01579B] ">สิ่งอำนวยความสะดวก</label>
                    <div class="mb-6 mt-6 md:flex md:items-center" v-for="(item, index) in list_facilitate" :key="index">
                        <label for="fb" class="text-xl font-bold mb-2 md:my-auto md:w-1/4 md:pr-4">รายการที่ {{ index+1 }}</label>


                        <div class="relative md:w-3/4 h-[54px] w-full">
                            <input 
                                @input="valueFacilitate(index, $event.target.value)"
                                type="tel" id='phone'
                                class="absolute h-full px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                :placeholder="`สิ่งอำนวยความสะดวก รายการที่ ${index+1}`"
                            >
                            <button @click="removeFacilitate(index)" class="absolute right-0 h-full px-3 bg-red-500 hover:bg-red-600 border-2 border-black rounded-r-lg">
                                <font-awesome-icon :icon="['fas', 'trash']" class="text-[24px] text-white" />
                            </button>
                        </div>
                    </div>
                    
                    <div class=" mt-6 md:flex md:items-center">
                        <label for="other" class="text-xl font-bold mb-2 md:my-auto md:w-1/4 md:pr-4">ช่องทางติดต่ออื่นๆ</label>
                        <div class="relative md:w-3/4">
                            <button @click="addFacilitate" class="bg-[#01579B] w-full py-[10px] text-white rounded-md text-2xl text-center hover:bg-blue-900 cursor-pointer">
                                เพิ่มรายการสิ่งอำนวยความสะดวก
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div class="w-full h-[2px] bg-[#F9A825] mt-10 mb-7"></div>

                <!-- รายการห้องพัก-->
                <div class="">
                    <p class="text-2xl mb-1 font-bold text-[#01579B]">รายการประเภท ห้องพัก</p>
                    <div class="w-full flex">

                        <div class="w-[45%]">
                            <label for="file_input2">
                                <div
                                    class=" w-full cursor-pointer  bg-white rounded-lg items-center justify-center flex flex-col border-2 border-gray-950 text-xl gap-2 h-auto py-20">
                                    <img id="show" src="https://img2.pic.in.th/pic/Vectorupload.png" class="w-20" alt="">
                                    <div class="text-[#A8A7A7]">DropFile Here</div>
                                    <div class="text-[#A8A7A7]">Or</div>
                                    <label for="file_input2"
                                        class="bg-[#F9A825] hover:bg-yellow-600 py-2 px-10 rounded-md text-white cursor-pointer">Select
                                        Files
                                    </label>
                                    <input id="file_input2" type="file" class="hidden" multiple>
                                </div>
                            </label>
                        </div>

                        <div class="w-[55%] flex flex-col items-end justify-between ">

                            <div class="w-[65%]">
                                <select name="roomtype" id="hotel"
                                    class="py-2 px-2 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                    <option disabled selected>ประเภทห้อง</option>
                                </select>
                            </div>
                            <div class="flex w-full items-center justify-end">
                                <label for="roomsize" class="w-[30%] px-5 text-right text-xl font-bold">ขนาดห้อง :</label>
                                <div class="w-[65%]">
                                    <input type="text" id='roomsize'
                                        class="py-2 px-2 pe-11 block w-full border-2 border-gray-950 rounded-lg">
                                </div>
                            </div>
                            <div class="flex w-full items-center justify-end">
                                <label for="bed" class="w-[30%] px-5 text-right text-xl font-bold">ขนาดเตียง :</label>
                                <div class="w-[65%]">
                                    <input type="text" id='bed'
                                        class="py-2 px-2 pe-11 block w-full border-2 border-gray-950 rounded-lg">
                                </div>
                            </div>
                            <div class="flex w-full items-center justify-end">
                                <label for="view" class="w-[30%] px-5 text-right text-xl font-bold">ทิวทัศน์ห้อง :</label>
                                <div class="w-[65%]">
                                    <select name="roomtype" id="hotel"
                                        class="py-2 px-2 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                        <option disabled selected>เลือกทิวทัศน์ห้อง</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex w-full items-center justify-end">
                                <label for="price" class="w-[30%] px-5 text-right text-xl font-bold">ราคา :</label>
                                <div class="w-[65%]">
                                        <div class="relative rounded-lg shadow-sm h-[42px]">
                                            <input type="number" id='price'
                                                class="absolute py-3 px-3 pe-11 z-0 block font-bold  h-full  w-full border-2 border-gray-950 rounded-s-lg "
                                            >
                                            <div 
                                                class="absolute px-10 -right-1 h-full bg-gray-400 text-white font-bold text-xl  inline-flex items-center rounded-e-lg border-y-2 border-r-2 border-gray-950">บาท</div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div class="flex w-full items-center">
                        <button type="button"
                            class="mt-6 py-3 w-full mx-auto bg-[#01579B] hover:bg-blue-900 text-white rounded-md shadow-inner flex items-center justify-center">
                            <p class="font-medium text-2xl">เพิ่มรายการที่พัก</p>
                        </button>
                    </div>

                </div>

                <div class="w-full h-[2px] bg-[#F9A825] my-16"></div>


                <div class="mb-12">
                    <button type="button"
                        class=" p-4 w-full bg-[#F9A825] hover:bg-yellow-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">สร้างบัญชีสถานที่</p>
                    </button>
                    <button type="button" class="mt-6 p-4 w-full bg-[#F93225] hover:bg-red-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">ยกเลิกสร้างบัญชีสถานที่</p>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-show="socialModalShow">
        <ModalSocialMedia @chooseSocial="addSocialMedia" :modalClose="() => socialModalShow = false" :show="socialModalShow" />
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


.leaflet-control-zoom{
    display: none;
}
</style>