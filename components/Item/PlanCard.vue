<script setup lang="ts">
import { defineProps } from 'vue'

type dataItem = {
    image: string,
    title: string,
}
defineProps<{
    dataItem: dataItem
    id: number
}>();
</script>
<template>
    <ClientOnly>
        <div class="w-[100%] overflow-x-hidden">
            <!-- รูปภาพตัวอย่าง -->
            <div class="relative w-[100%] min-h-[300px] mb-4 bg-cover bg-center rounded-lg" :style="`background-image: url(${dataItem.image})`">
                <div class="absolute inset-x-6 top-6 rounded-lg h-[40%] flex items-center" style="background-color: rgba(255, 255, 255, 0.8);">
                    <!-- ชื่อแผนการ -->
                    <p class="text-[20px] text-center font-bold">{{ dataItem.title }}</p>
                </div>
                <div class="absolute inset-x-0 bottom-0 rounded-b-lg py-2 px-4 lg:flex items-center" style="background-color: rgba(0, 0, 0, 0.526);">
                    <!-- รายการรูปคนในแผน หากเกิน 4 คน จะแสดงตัวเลข + (จำนวนคน - 4 คนที่แสดงแล้ว)-->
                    <div class="mr-auto mb-2 lg:mb-0 flex items-center justify-center h-full w-full lg:w-fit -space-x-2 font-mono text-white text-sm font-bold leading-6">
                        <div class="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500 shadow-lg ring-2 ring-white z-10 dark:ring-slate-900">01</div>
                        <div class="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500 shadow-lg ring-2 ring-white z-20 dark:ring-slate-900">02</div>
                        <div class="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500 shadow-lg ring-2 ring-white z-30 dark:ring-slate-900">03</div>
                        <div class="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500 shadow-lg ring-2 ring-white z-50 dark:ring-slate-900">04</div>
                    </div>

                    <!-- ปุ่มไปยังแผนการ -->
                    <NuxtLink :to="`/plan/${id}`" class="px-6 py-2 w-full lg:w-fit rounded-lg bg-[#F9A825] flex items-center justify-center border-2 border-white">
                        <font-awesome-icon :icon="['fas', 'eye']" class="text-[20px] text-white xl:mr-2" />
                        <p class="lg:hidden xl:block text-[18px] leading-4 font-medium text-white">ดูแผน</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>