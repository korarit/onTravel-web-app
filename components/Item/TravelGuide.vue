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
        <NuxtLink :to="`/place/${id}`" class="w-[100%] h-[100%]" >
        <div class="w-[100%] overflow-x-hidden">
            <!-- รูปภาพตัวอย่าง -->
            <div class="w-[100%] h-[250px] mb-4">
                <img :src="dataItem.image" alt="image of place" class="object-cover drop-shadow-md rounded-xl w-[100%] h-[100%]">
            </div>

            <p class="text-[20px] text-justify">
                {{ dataItem.title  }}
            </p>
        </div>
        </NuxtLink>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>