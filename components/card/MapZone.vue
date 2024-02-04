<script setup>
defineProps({
    image: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    use: {
        type: Boolean,
        default: false
    },
    setUse:{
        type: Function
    }
})
</script>
<template>
    <button @click="setUse()" :class="`w-full h-full bg-cover bg-center rounded-xl grid grid-cols-1 drop-shadow-md shadow-[#0f0f0f65] ${use ? 'border-4 border-black' : ''}`" :style="{ 'background-image': 'url(' + image + ')' }">
        <div class="place-self-center h-[40%] w-[80%] flex flex-col justify-center items-center rounded-lg" style="background-color: rgba(0, 0, 0, 0.517);">
            <p class="text-[28px] text-white font-bold select-none  ">{{ title }}</p>
        </div>
    </button>
</template>