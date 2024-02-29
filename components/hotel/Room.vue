<template>
    <div class="flex w-full h-[20dvw] sha shadow-[#0000004b]">
        <div class=" w-1/2 h-full bg-cover bg-center border-l-2 border-y-2 border-black rounded-l-xl relative" :style="`background-image: url('${data.image[0]}');`">
            <button @click="() => openImg()" class=" flex items-center justify-center rounded-bl-xl  absolute inset-x-0 bottom-0 w-full h-20 select-none" style="background-color: rgba(255, 255, 255, 0.7)">
                <font-awesome-icon :icon="['fas', 'camera-retro']" class="text-3xl mr-4" style="color: rgba(0, 0, 0, 0.8);" />
                <p class=" text-xl font-bold" style="color: rgba(0, 0, 0, 0.7);">คลิกเพื่อดูรูปภาพเพิ่มเติม</p>
            </button>
        </div>
        <div class="w-1/2 h-full bg-[#FDFDFD] border-black border-2  rounded-r-xl flex items-center p-6">
            <div class="h-fit">
                <p class="text-2xl mb-2 font-bold">ขนาดห้อง {{ data.room_area }}</p>
                <p class="text-2xl mb-2 font-bold">ประเภทวิว {{ data.view_type }}</p>
                <p class="text-2xl mb-2 font-bold">ประเภทเตียง {{ data.bed_type }}</p>
                <p class="text-2xl font-bold">ราคา {{ data.price.toLocaleString() }} บาท</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

interface Room {
    name: string
    bed_type: string
    view_type: string
    room_area: string
    price: number
    image: string[]
}
defineProps<{
  data: Room,
  openImg: Function
}>()
</script>

<style scoped>
body {
  font-family: "Kanit", cursive;
}
</style>