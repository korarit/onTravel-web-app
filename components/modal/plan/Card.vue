<script setup lang="ts">
const props = defineProps({
    modalClose: Function,
    Data: Object,
    show: Boolean
});

const showTrasition = ref<boolean>(false)

watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })

function ModalClose() {
    showTrasition.value = false
    setTimeout(() => {
        if (props.modalClose) {
            props.modalClose();
        }
    }, 320);
}

//url จาก config
const config = useRuntimeConfig()

</script>

<style scoped>
@import url("~/assets/css/modal.css");
</style>

<template>
    <div class="modal-overlay items-center">
    <Transition name="modal">
            <div v-if="showTrasition " class="p-8 h-fit w-[90dvw] md:w-[70dvw] lg:w-[50dvw]  2xl:w-[40dvw] bg-white rounded-xl shadow-md" >

                <div class="flex justify-between">
                    <div>
                        <h1 class="text-3xl font-bold">ข้อมูลแผนการ</h1>
                        <p class="mb-3  font-semibold text-lg">เวลา เริ่ม {{ ("0" + new Date(Data?.start_time).getHours()).slice(-2) }}:{{ ("0" + new Date(Data?.start_time).getMinutes()).slice(-2) }} สิ้นสุด {{ ("0" + new Date(Data?.end_time).getHours()).slice(-2) }}:{{ ("0" + new Date(Data?.end_time).getMinutes()).slice(-2) }}</p>                    
                    </div>

                    <button @click="ModalClose" class="w-fit h-fit">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[42px]" />
                    </button>
                </div>

                <div class="mb-2 bg-[#288CD4]/15  border-[#288CD4] px-2 py-2  border-2 shadow-md border-solid  h-fit w-full  rounded-2xl">
                    <div class="flex items-center  w-">
                        <div class="h-[42px] w-[42px] flex items-center">
                            <img src="/icon/weather/1.svg" width="80px" height="80px">
                        </div>
                        <div class="ml-3 font-semibold text-[18px]">
                            <p>สภาพอาการปลอดโปร่ง มีเมฆเล็กน้อย</p>
                        </div>
                    </div>
                </div>

                    
                <h1 class="mb-3 text-lg font-semibold" >รายละเอียด</h1>
                
                <div>
                    <div class="w-full flex justify-center mt-[-1dvh]  h-[15dvh]">
                        <div class="bg-[#D9D9D9] shadow-inner shadow-black/40 h-full rounded-lg w-full  p-3" v-html="Data?.description" >
                        </div>

                    </div>  
                
                </div>
                <div class="w-full h-fit flex justify-between items-center py-3">
                    <h1 class="text-xl font-semibold">ที่ตั้งสถานที่ </h1>
                    <NuxtLink
                        :to="`https://www.google.com/maps/@${Data?.location.lat},${Data?.location.lon}`"
                        target="_blank"
                        class="w-[10dvw] shadow-xl  py-2 bg-black text-white rounded-xl text-lg text-center"
                    >
                        นำทาง
                    </NuxtLink>
                </div>
                <div class=" w-full flex justify-center">
                    <div class=" bg-gray-500  w-[100%] h-[20dvh] shadow-md rounded-lg">
                        <GoogleMap :location="[Data?.location.lat, Data?.location.lon]" :zoomLevel="16" /> 
                    </div>
                </div>
                <div class=" w-full mt-4 flex justify-center" >
                    <button class="bg-[#F23B3B] h-full w-full py-3 rounded-xl flex shadow-xl items-center justify-center">
                        <h1 class="text-2xl font-semibold text-white">ลบแผนการ</h1>
                    </button>
                </div>
            
            </div>

    </Transition>
    </div>
    
</template>

