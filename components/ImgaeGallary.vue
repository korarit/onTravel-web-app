<template>
    <div class="h-[500px] mb-4">
    <component :is="Carousel" id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
        <component :is="Slide" v-for="slide in (ImageList?.length - 1)" :key="slide">
            <div class="carousel__item bg-cover bg-center" :style="`min-height: 500px;width:100%`">
                <NuxtImg :src="ImageList[slide]" :modifiers="{height:500,width:1000}" format="avif" fill="cover" height="500" width="1000" style="object-fit: cover;height: 100%;width: 100%;"/>
            </div>
        </component>

        <template #addons >
            <component :is="Navigation" />
        </template>
    </component>
    </div>

    <component :is="Carousel" id="thumbnails" :items-to-show="7" :wrap-around="true" v-model="currentSlide" ref="carousel">
        <component :is="Slide" v-for="index in (ImageList?.length - 1)" :key="index" style="margin: 0;">
            <div class="grallay-item mx-0 bg-cover bg-center" @click="slideTo(index - 1)" :style="`height: 100px;width:100%`">
                <NuxtImg :src="ImageList[index]" format="webp" :modifiers="{height:500,width:1000}" height="100" width="200" style="object-fit: cover;height: 100%;width: 100%;" />
            </div>
        </component>
    </component>
</template>

<style scoped>
.carousel__next{
    width: 36px;
}
.carousel__icon{
    height: 36px;
    width: 36px;
    color: white;
}

.carousel__slide {
    min-height: 100%;
    height: 100%;
    margin: 0;
}
.carousel__item {
    height: 500px;
    width: 100%;
    max-height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.grallay-item {
    height: 100px;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  
<script setup lang="ts">
import { defineComponent } from 'vue'
import { Carousel, Slide , Navigation } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

defineProps({
    ImageList: Object
})

const currentSlide = ref<any>(0)

function slideTo(slide: number) {
    currentSlide.value = slide
}
</script>