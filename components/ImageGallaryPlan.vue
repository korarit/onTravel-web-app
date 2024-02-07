<script setup lang="ts">


const list_image_url = ref<String[]>([
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
]);

const distance_left = ref<Number>( Number((12 / (list_image_url.value.length - 1)).toFixed(2)) );
const distance_top = ref<Number>( Number((6 / (list_image_url.value.length - 1)).toFixed(2)) );

const box_width = ref<Number>( 45 + (Number(distance_left.value) * (list_image_url.value.length - 1)) );
const box_height = ref<Number>( 26 + (Number(distance_top.value) * (list_image_url.value.length - 1)) );

//console.log(distance_left.value , distance_top.value)

</script>

<template>
    <ClientOnly>
    <div class="relative" :style="`height: ${box_height}dvw;width: ${box_width}dvw;`">
        <div v-for="(data, index) in list_image_url" 
            :key="index" 
            :class="`transition duration-100 ease-linear 
            ${index !== (list_image_url.length - 1) ? 'hover:-translate-y-[80px]' : ''} 
            absolute shadow-md shadow-[#0000004d] 
            w-[45dvw] h-[26dvw] rounded-xl flex items-center justify-center bg-cover bg-center z-10 border-2 border-white`"
            
            :style="`background-image: url(${data});top: ${String(Number(distance_top)*index)}dvw;left: ${String(Number(distance_left)*index)}dvw`"></div>
    </div>
    </ClientOnly>
</template>