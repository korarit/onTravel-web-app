<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props:any = defineProps({
    modalClose: Function,
    TimeStamp: Number,
    show: Boolean
});

////////////////// แปลภาษา //////////////////////
const language = ref<any>(await inject('language'))
const language_code = ref<any>(await inject('language_code'))

const showTrasition = ref(false)

// ตรวจสอบค่า props.show ถ้าเป็น true ให้แสดงการเปลี่ยนค่า showTrasition ให้เป็น true เพื่อให้แสดงการเปิด Modal อย่างสวยงาม
watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })

// ฟังก์ชันปิด Modal และเปลี่ยนค่า showTrasition ให้เป็น false เพื่อให้แสดงการซ่อน Modal อย่างสวยงาม
function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
    }, 310);
}

interface PlanCardAdd {
    title: string;
    description: string;
    image: string;
    view: number;
    review_point: number;
    start_time: Date;
    end_time: Date;

    owner_name: string;
    owner_lastname: string;
    owner_image: string;

    location: {
        lat: number;
        lon: number;
    }
}


const start_time = ref<Date>(new Date(props.TimeStamp))
const end_time = ref<Date>(new Date(props.TimeStamp))

// สำหรับเก็บข้อมูลแผนการท่องเที่ยว
const plan_data = ref<PlanCardAdd>({
    title: "",
    description: "",
    image: "",
    view: 0,
    review_point: 0,
    start_time: start_time.value,
    end_time: end_time.value,
    owner_name: "Korarit",
    owner_lastname: "Saengthong",
    owner_image: "test.png",
    location: {
        lat: 0,
        lon: 0
    }
})

//สำหรับเก็บวันที่เริ่มต้นและสิ้นสุด
const range = ref<Date>(new Date())
watch(range.value, (value:any) => {
    plan_data.value.start_time = value['start'].getTime()
    plan_data.value.end_time = value['end'].getTime()
})

//สำหรับเก็บชื่อไฟล์รูปภาพปก
const file_name = ref<String>("")
// สำรหรับอัพโหลดรูปภาพปก
function cover_upload(e:any){
    // file type is image
    if(!e.target.files[0].type.startsWith("image")){
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น")
        return
    }
    let name:String = e.target.files[0].name

    plan_data.value.image = URL.createObjectURL(e.target.files[0])

    file_name.value = name
}

//ส่งข้อมูลกลับไปยังหน้าแม่
const emit = defineEmits(['addCard'])
function addDataToPlan(){
    ModalClose()
    emit('addCard', plan_data.value)
}




////////////////// สำหรับแผนที่ //////////////////
const map = ref<any | null>(null);
const pin_object = ref<any | null>(null);

onMounted(async () => {
    const { L } = await import('leaflet');
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

    // พิกัดของ pin เมื่อสร้าง
    plan_data.value.location.lat = center.lat;
    plan_data.value.location.lon = center.lng;

    pin_object.value =  L.marker(center, {icon: icon, draggable: true}).addTo(map.value.leafletObject);
    pin_object.value.on('dragend', function(event:any){
        let marker = event.target;
        let position = marker.getLatLng();
        plan_data.value.location.lat = position.lat;
        plan_data.value.location.lon = position.lng;
    });
}

const resetting_start = ref(false);
watch(() => start_time.value, (value:any) => {
    if (resetting_start.value) {
        resetting_start.value = false;
        return;
    }

    let startDate = new Date(props.TimeStamp)
    let endDate = new Date(props.TimeStamp + 60 * 60 * 24 * 1000);
    let select_time = new Date(value)
    if (select_time >= startDate && select_time < endDate){
        console.log('in range')
    }else{
        console.log('out of range')
        resetting_start.value = true;
        nextTick(() => {
            start_time.value = new Date(props.TimeStamp)
        });
    }
})

const resetting_end = ref(false);
watch(() => end_time.value, (value:any) => {
    if (resetting_end.value) {
        resetting_end.value = false;
        return;
    }

    let startDate = new Date(props.TimeStamp)
    let endDate = new Date(props.TimeStamp + 60 * 60 * 24 * 1000);
    let select_time = new Date(value)
    if (select_time >= startDate && select_time < endDate){
        console.log('in range')
    }else{
        console.log('out of range')
        resetting_end.value = true;
        nextTick(() => {
            end_time.value = new Date(props.TimeStamp)
        });
    }
})

</script>
<style scoped>
@import url("~/assets/css/modal.css");


</style>

<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-if="showTrasition" class="bg-[#fdfdfd] rounded-lg h-fit w-[45%] 2xl:w-[35%] p-6">
                <div class="modal-head h-[48px] w-[100%] flex justify-between items-center mb-2">
                    <!-- title-->
                    <p class="text-[28px] text-center leading-[34px] font-semibold">{{ language.modal.plan_card_create.title }}</p>
                    <button @click="ModalClose()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[40px] font-bold cursor-pointer" />
                    </button>
                </div>
                <div class=" w-[100%] h-[60dvh] overflow-y-auto">

                    <!-- fill กรอก ชื่อแผนการท่องเที่ยว -->
                    <div class="relative w-full"> 
                        <input
                            v-model="plan_data.title"
                            class="pl-4 w-full h-[44px] text-[18px] placeholder:text-[#9E9E9E] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] rounded-md mb-4 focus:outline-none"
                            type="text"
                            :placeholder="language.modal.plan_card_create.input_title"
                        >
                    </div>
                    <div class="flex w-full">
                        <VDatePicker :locale="language_code" v-model="plan_data.start_time" mode="dateTime" is24hr :min-date="new Date(2024, 1 , 1)" :max-date="new Date(2024, 1 , 29)">
                            <template #default="{ inputValue, inputEvents }">
                                <div class="flex w-[45%] mb-4">

                                    <!-- fill กรอก วันที่เริ่มต้น -->
                                    <div class="w-full">
                                        <p class="text-[18px] font-medium leading-5">{{ language.modal.plan_card_create.start_date }}</p>
                                        <div class="relative w-full"> 
                                            <input 
                                                class="pl-[40%] pr-4 py-2 border w-full rounded-md text-[20px] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] focus:outline-none" 
                                                :placeholder="language.modal.plan_create.start_date"
                                                :value="new Date(plan_data.start_time).getHours() + ' : '  + new Date(plan_data.start_time).getMinutes()"
                                                v-on="inputEvents"
                                            /> 
                                            <div class="absolute inset-y-0 left-0 pl-[10%]  flex items-center  pointer-events-none"> 
                                                <font-awesome-icon :icon="['fas', 'hourglass-start']" class="text-[24px]" />
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                            </template>
                        </VDatePicker>
                        <VDatePicker :locale="language_code" v-model="plan_data.end_time" mode="dateTime" is24hr :min-date="new Date(2024, 1 , 1)" :max-date="new Date(2024, 1 , 29)">
                            <template #default="{ inputValue, inputEvents }">
                                <div class="ml-auto w-[45%]">
                                    <!-- fill กรอก วันที่เริ่มต้น -->
                                    <div class="w-full">
                                        <p class="text-[18px] font-medium leading-5">{{ language.modal.plan_card_create.start_date }}</p>
                                        <div class="relative w-full"> 
                                            <input 
                                                class="pl-[40%] pr-4 py-2 border w-full rounded-md text-[20px] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] focus:outline-none" 
                                                :placeholder="language.modal.plan_create.start_date"
                                                :value="new Date(plan_data.end_time).getHours() + ' : '  + new Date(plan_data.end_time).getMinutes()"
                                                v-on="inputEvents"
                                            /> 
                                            <div class="absolute inset-y-0 left-0 pl-[10%]  flex items-center  pointer-events-none"> 
                                                <font-awesome-icon :icon="['fas', 'hourglass-start']" class="text-[24px]" />
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                            </template>
                        </VDatePicker>
                    </div>
                    <!-- fill กรอกลายระเอียด-->
                    <div class="bg-[#e9e9e9] rounded-md mb-4 h-fit">

                        <!-- rich text editor use VueQuill library (is not support NUXTJS by Defult) -->
                        <component :is="QuillEditor"
                            toolbar="essential"
                            class="min-h-[20dvh] rounded-b-md shadow-inner shadow-[#00000034]" 
                            v-model:content="plan_data.description"
                            contentType="html"
                         />
                    </div>

                    <!-- สำหรับปัดหมุดพิกัด -->
                    <p class="text-[18px] font-medium leading-5 mt-2 mb-2">{{ language.modal.plan_card_create.map }}</p>
                    <div class="w-full h-[280px] relative">
                        <button @click="addPin" class="absolute bottom-6 left-4 h-12 w-12 bg-white rounded-lg z-10 flex items-center justify-center" >
                            <font-awesome-icon :icon="['fas', 'location-dot']" class="text-[36px] text-red-500" />
                        </button>

                        <div class="flex flex-col space-y-4 absolute bottom-6 right-4">
                            <button @click="ZoomIn" class=" h-12 w-12 bg-white rounded-lg z-10 flex items-center justify-center" >
                                <font-awesome-icon :icon="['fas', 'plus']" class="text-[36px]" />
                            </button>
                            <button @click="ZoomOut" class=" h-12 w-12 bg-white rounded-lg z-10 flex items-center justify-center" >
                                <font-awesome-icon :icon="['fas', 'minus']" class="text-[36px] " />
                            </button>
                        </div>

                        
                        <div class="absolute w-full h-full rounded-md overflow-hidden z-0">
                            <ClientOnly>
                            <LMap
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


                    <!-- สำหรับ upload รูปภาพ -->
                    <p class="text-[18px] font-medium leading-5 mt-2 mb-2">{{ language.modal.plan_card_create.image }}</p>
                    <div class="flex items-center space-x-4 mb-5">
                        <label class=" bg-[#e9e9e9] rounded-md px-[60px] border border-black py-2 cursor-pointer" for="ImageCover">
                            <p class="text-[20px] font-medium">{{ language.modal.plan_card_create.button_upload }}</p>
                        </label>
                        <p class="text-[18px] font-medium">{{ file_name }}</p>
                        <input type='file' id="ImageCover" hidden @change="cover_upload">
                    </div>

                    <!-- ปุ่มสร้างแผน -->
                    <button
                    @click="addDataToPlan"
                        class="w-full h-[50px] rounded-md mb-6 bg-[#FFA624] hover:bg-[#d68923] shadow-sm shadow-[#232323]  text-[24px] font-bold text-white focus:outline-none"
                    >
                        {{ language.modal.plan_card_create.button_create }}
                    </button>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>