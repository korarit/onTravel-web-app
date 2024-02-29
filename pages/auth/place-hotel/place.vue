<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ThaiData from "~/assets/json/thailand_data.json"


if (!process.server) {
    const { QuillEditor } = await import ('@vueup/vue-quill');
    const { vueApp } = useNuxtApp ();
    vueApp.component ('QuillEditor', QuillEditor);


}


definePageMeta({
    layout: 'defaultmain',
    auth: 'auth'
});
////////////////////// แปลภาษา ///////////////////////
const language = ref(await inject('language'));
const lang_code = await inject('language_code');


////////////////////////////// ตำแหน่งที่อยู่ //////////////////////////////
const selectedProvince = ref([]);
const selectedAmphoe = ref([]);
const selectedTambon = ref([]);

const handleProvince = async (value) => {
    if (value === null) {
        selectedProvince.value = [];
        selectedAmphoe.value = [];
        selectedTambon.value = [];
        return;
    }
    selectedProvince.value = await value['amphoes']
};
const handleAmphoe = async (value) => {
    if (value === null) {
        selectedAmphoe.value = [];
        selectedTambon.value = [];
        return;
    }
    selectedAmphoe.value = await value['districts']
};
const handleTambon = async (value) => {
    selectedTambon.value = await value
};

const map = ref(null);
const pin_object = ref(null);

onMounted(async () => {
    if(!process.server){
        const { L } = await import('leaflet');
    }

    watch(selectedTambon, (newVal) => {
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

//สำหรับเก็บค่าที่เลือกในการสนใจ
const interest = ref({
    adventure: false,
    nature: false,
    sea: false,
    history: false,
    eating: false,
    scenic: false
})

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
const addSocialMedia = (value) => {
    socialList.value.push(value);
    console.log(socialList.value);
}
const removeSocialMedia = (index) => {
    socialList.value.splice(index, 1);
}
</script>
<template>
    <ClientOnly>
    <div>
        <div class="container mx-auto px-4 py-4 lg:px-40 mt-10">
            <div class="flex flex-col">
                <div>
                    <label for="new" class="text-2xl font-bold text-[#01579B]">ชื่อสถานที่</label>
                    <input type="text" id='name'
                        class="mt-3 py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg "
                        placeholder="ชื่อสถานที่">
                </div>
                <div class="mt-4">
                    <label for="info" class="text-2xl  font-bold text-[#01579B]">รายละเอียดสถานที่</label>
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
                    <UploadImage />
                </div>
                <div class="mt-4">
                    <label for="new" class="text-2xl font-bold text-[#01579B] ">ช่องทางการติดต่อ</label>
                    <div class="mb-6 mt-6 md:flex md:items-center" v-for="(contact, index) in socialList" :key="index">
                        <label for="fb" class="text-xl font-bold mb-2 md:my-auto md:w-1/4 md:pr-4">{{ contact.name }}</label>


                        <div class="relative md:w-3/4 h-[54px] w-full">
                            <input 
                                type="tel" id='contact'
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
                <div class="mt-6">
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">ที่อยู่ของสถานที่</label>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <div
                            class="mb-2 md:w-1/4 md:pr-4 flex sm:items-start  sm:justify-start items-center justify-center">
                            <img class="h-[300px] "
                                src="https://assets.grab.com/wp-content/uploads/sites/10/2023/05/25185720/2-1.jpg">
                        </div>
                        <div class="relative md:w-3/4  flex flex-col justify-between h-[250px]">

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
                
                <label for="" class="text-3xl font-bold mt-8  md:w-1/4 md:pr-4 text-[#01579B]">ประเภทของสถานที่</label>
                <div class="mb-6 mt-6 md:items-center justify-items-between  grid grid-cols-3 gap-8 text-center">
                    <button 
                        :class="`${interest.adventure ? 'bg-[#36ad2d]' : 'bg-[#616161]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.adventure = !interest.adventure"
                    >
                        {{ language.page.register.interests.adventure }}
                    </button>
                    <button 
                        :class="`${interest.nature ? 'bg-[#36ad2d]' : 'bg-[#616161]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.nature = !interest.nature"
                    >
                        {{ language.page.register.interests.nature }}
                    </button>
                    <button 
                        :class="`${interest.sea ? 'bg-[#36ad2d]' : 'bg-[#616161]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.sea = !interest.sea"
                    >
                        {{ language.page.register.interests.sea }}
                    </button>
                    <button 
                        :class="`${interest.history ? 'bg-[#36ad2d]' : 'bg-[#616161]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.history = !interest.history"
                    >
                        {{ language.page.register.interests.history }}
                    </button>
                    <button 
                        :class="`${interest.eating ? 'bg-[#36ad2d]' : 'bg-[#616161]'} py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.eating = !interest.eating"
                    >
                        {{ language.page.register.interests.eat }}
                    </button>
                    <button 
                        :class="`${interest.scenic ? 'bg-[#36ad2d]' : 'bg-[#616161]'}  py-3 border border-solid border-black rounded-3xl text-white text-xl select-none`"
                        @click="interest.scenic = !interest.scenic"
                    >
                        {{ language.page.register.interests.farm }}
                    </button>
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
            </div>
        </div>
    </div>

    <div v-if="socialModalShow">
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