<script setup>
import { ref } from 'vue';
import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    ModalClose: Function,
    ImageChange: Function,
    image: String
})

////////////////// แปลภาษา //////////////////////
const language = ref(inject('language'))

const cropper = ref(null);

//ดึง result จากการ crop รูปภาพ แล้วส่งไปยังหน้าที่เรียกใช้
function crop_image(){
    //ดึงข้อมูลจากการ crop รูปภาพ
    const { coordinates, canvas, } = cropper.value.getResult();

    //ส่งรูปภาพที่ crop ได้ไปยังหน้าที่เรียกใช้
    props.ImageChange(canvas.toDataURL());
    //ปิด Modal
    props.ModalClose();
}
</script>
<style scoped>
@import url("~/assets/css/modal.css");
.cropper-wrapper {
	overflow: hidden;
	position: relative;
    max-width: 50dvw;
    height: 50dvh;
}
.cropper-background {
	background: rgba(103, 103, 103, 0.5);
}
.image-background {
	position: absolute;
	height: 50dvh;
	left: 0;
	top: 0;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
}

</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <div class="bg-[#fdfdfd] rounded-lg h-fit px-12 pb-2 w-fit">
                <!-- title -->
                <div class="modal-head h-fit w-[100%] flex items-center mt-4 mb-4">
                    <p class="w-[95%] flex items-center justify-center text-[28px] h-fit leading-6">{{ language.modal.image_crop.title }}</p>
                    <button @click="ModalClose()" class="flex items-center justify-center w-[5%] h-[36px]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[48px] font-bold cursor-pointer" />
                    </button>
                </div>
                <!-- image crop -->
                <div class="cropper-wrapper">
                    <div :style="{backgroundImage: 'url(' + image + ')'}" class="image-background"></div>

                    <!-- use vue advanced cropper library (is not support NUXTJS by Defult)-->
                    <component :is="Cropper"
                        background-class="cropper-background"
                        
                        :src="image"
                        :stencil-props="{
                            aspectRatio: 1
                        }"
                        :canvas="{
                            minHeight: 0,
		                    minWidth: 0,
		                    maxHeight: 512,
		                    maxWidth: 512,
                        }"
                        :resize-image="{
		                    adjustStencil: false,
                            wheel: false
	                    }"
                        :stencil-component="CircleStencil"
                        ref="cropper"
                    />
                </div>

                <!-- ปุ่มยันยันการใช้ตำแหน่งและขนาดที่ crop ของรูป-->
                <div class="flex flex-col my-8">
                    <button 
                        class="w-[90%] mx-auto h-[48px] flex items-center justify-center text-[18px] font-bold text-[#fdfdfd] bg-[#FF9800] border rounded-md cursor-pointer"
                        @click="crop_image()"
                    >
                        ยืนยัน{{ language.modal.image_crop.confirm }}
                    </button>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>