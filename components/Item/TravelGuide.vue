<script setup lang="ts">
import { defineProps } from 'vue'

type dataItem = {
    image: string,
    title: string,
}
defineProps<{
    dataItem: dataItem
}>();
</script>
<template>
    <ClientOnly>
        <div class="w-[100%] overflow-x-hidden">
            <!-- รูปภาพตัวอย่าง -->
            <div class="w-[100%] h-[250px] mb-4">
                <img :src="dataItem.image" class="object-cover drop-shadow-md rounded-xl w-[100%] h-[100%]">
            </div>

            <p class="text-[20px] text-justify">
                {{ dataItem.title  }}
            </p>
        </div>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>