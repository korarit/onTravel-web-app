<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props:any = defineProps({
    modalCloseShow: Function,
    show: Boolean
});

const showTrasition = ref(false)

watch(() => props.show, (value) => {
    if (value) {
        showTrasition.value = true
    }
})
function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.modalCloseShow()
    }, 310);
}

const file_name = ref<String>("")
function cover_upload(e:any){
    // file type is image
    if(!e.target.files[0].type.startsWith("image")){
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น")
        return
    }
    let name:String = e.target.files[0].name
    file_name.value = name
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");


</style>

<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-lg h-fit w-[45%] 2xl:w-[35%]">
                <div class="modal-head h-[48px] w-[100%] pr-5 pt-5 flex justify-end">
                    <button @click="ModalClose()">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[32px] font-bold cursor-pointer" />
                    </button>
                </div>
                <div class="modal-body w-[100%] flex flex-col px-6 pb-6">
                    <p class="text-[30px] text-center leading-[34px] font-extrabold mb-5">สร้างแผนการท่องเที่ยว</p>
                    <div class="relative w-full"> 
                        <input
                            class="pl-4 w-full h-[44px] text-[18px] placeholder:text-[#9E9E9E] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] rounded-md mb-4 focus:outline-none"
                            type="text"
                            placeholder="ชื่อแผนการท่องเที่ยว"
                        >
                    </div>
                    <div class="flex justify-between w-full mb-4">
                        <div class="w-[43%]">
                            <p class="text-[18px] font-medium leading-5">วันที่เริ่มต้น</p>
                            <div class="relative w-full"> 
                                <input 
                                    type="date"
                                    class="pl-12 pr-4 py-2 border w-full rounded-md text-[18px] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] focus:outline-none" 
                                    placeholder="วันที่เริ่มต้น" 
                                /> 
                                <div class="absolute inset-y-0 left-0 pl-4  flex items-center  pointer-events-none"> 
                                    <font-awesome-icon :icon="['fas', 'hourglass-start']" class="text-[24px]" />
                                </div> 
                            </div> 
                        </div>
                        <div class="w-[43%]">
                            <p class="text-[18px] font-medium leading-5">วันที่สิ้นสุด</p>
                            <div class="relative w-full"> 
                                <input 
                                    type="date"
                                    class="pl-12 pr-4 py-2 border w-full rounded-md text-[18px] bg-[#e9e9e9] shadow-inner shadow-[#0000005a] focus:outline-none" 
                                    placeholder="วันที่สิ้นสุด" 
                                /> 
                                <div class="absolute inset-y-0 left-0 pl-4  flex items-center  pointer-events-none"> 
                                    <font-awesome-icon :icon="['fas', 'hourglass-end']" class="text-[24px]" />
                                </div> 
                            </div> 
                        </div>
                    </div>
                    <div class="bg-[#e9e9e9] rounded-md mb-5">
                        <component :is="QuillEditor"
                            toolbar="essential"
                            class="min-h-[200px] rounded-b-md shadow-inner shadow-[#00000034]" 
                         />
                    </div>

                    <p class="text-[18px] font-medium leading-5 mb-2">รูป ปกแผนการท่องเที่ยว</p>
                    <div class="flex items-center space-x-4 mb-5">
                        <label class=" bg-[#e9e9e9] rounded-md px-[60px] border border-black py-2 cursor-pointer" for="ImageCover">
                            <p class="text-[20px] font-medium">อัพโหลด</p>
                        </label>
                        <p class="text-[18px] font-medium">{{ file_name }}</p>
                        <input type='file' id="ImageCover" hidden @change="cover_upload">
                    </div>
                    <button
                        class="w-full h-[50px] rounded-md bg-[#FFA624] hover:bg-[#d68923] shadow-sm shadow-[#232323]  text-[24px] font-bold text-white focus:outline-none"
                    >
                        สร้างแผนการท่องเที่ยว
                    </button>
                </div>
            </div>
            </Transition>
        </div>
    </ClientOnly>
</template>