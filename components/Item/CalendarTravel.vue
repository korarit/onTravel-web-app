<script setup lang="ts">
import { defineProps } from 'vue'
type dataItem = {
    name: string,
    time: string,
    detail: string
}
defineProps<{
    dataItem: dataItem
}>();
</script>
<style>
.main-card{
    @apply w-[100%] h-[300px] bg-cover bg-center rounded-xl shadow-lg grid grid-cols-1;
}
.title-card{
    @apply place-self-center h-[40%] w-[80%] flex flex-col justify-center items-center rounded-lg;
}
.deatil-card{
    @apply place-self-end w-[100%] py-2 px-3 rounded-b-xl text-white text-[20px] overflow-hidden;
    display: none;
}
.main-card:hover .title-card{
    @apply hidden;
}
.main-card:hover .deatil-card{
    height: 30%;
    display: block;
    transition: 1s ease-in-out;
}
</style>
<template>
    <ClientOnly>
        <div class="w-[100%] overflow-x-hidden select-none">
            <!-- รูปภาพตัวอย่าง -->
            <div class="main-card" :style="`background-image: url('https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIVNrgcAuSEVpmdZwKSC23KlKAEMNBbMBJ7GEvpfzId6osBXpwm.jpg')`">
                <div class="title-card" style="background-color: rgba(0, 0, 0, 0.517);">
                    <p class="text-[28px] text-white font-bold">{{ dataItem.name }}</p>
                    <p class="text-[24px] text-white">{{ dataItem.time }}</p>
                </div>
                <div class="deatil-card" style="background-color: rgba(0, 0, 0, 0.517);">
                    {{ dataItem.detail  }}
                </div>
            </div>
        </div>
    </ClientOnly>
</template>