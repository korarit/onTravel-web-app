<script setup>
import { ref } from 'vue';
import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    ModalClose: Function,
    ImageChange: Function,
    image: String
})

const cropper = ref(null);


function crop_image(){
    const { coordinates, canvas, } = cropper.value.getResult();
    // You able to do different manipulations at a canvas
    // but there we just get a cropped image, that can be used 
    // as src for <img/> to preview result
    props.ImageChange(canvas.toDataURL());
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
                <div class="modal-head h-fit w-[100%] flex items-center mt-4 mb-4">
                    <p class="w-[95%] flex items-center justify-center text-[28px] h-fit leading-6">Upload Profile Image</p>
                    <button @click="ModalClose()" class="flex items-center justify-center w-[5%] h-[36px]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[48px] font-bold cursor-pointer" />
                    </button>
                </div>
                <div class="cropper-wrapper">
                    <div :style="{backgroundImage: 'url(' + image + ')'}" class="image-background"></div>
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
                <div class="flex flex-col my-8">
                    <button 
                        class="w-[90%] mx-auto h-[48px] flex items-center justify-center text-[18px] font-bold text-[#fdfdfd] bg-[#FF9800] border rounded-md cursor-pointer"
                        @click="crop_image()"
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>