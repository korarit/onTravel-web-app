<script setup lang="ts">
interface dataItem {
    id: number,
    description: string,
    point: number,
    image: string[]
}
defineProps<{
    data: dataItem
}>();
</script>

<template>
    <div class="border-black border-2 bg-[#FDFDFD] p-6 rounded-lg h-fit w-full">
        <div class="flex justify-between">
            <p class="text-[28px] font-medium justify-start">
                รีวิว {{ data.id }}
            </p>
        </div>
        <div class="mt-2">
            <Star :Point="4.5" />
        </div>
        <div class="text-justify mt-2">
            {{ data.description }}
        </div>
        <div class="mt-4 h-[10dvw] w-full grid grid-cols-8 gap-6" v-if="data.image.length !== 0">
            <div class="w-[100%] h-auto rounded-xl drop-shadow-md shadow-black/20" v-for="image in data.image" :key="image">
                <NuxtImg :src="image" :modifiers="{height:500,width:1000}" format="avif" fill="cover" height="200" width="200" class="rounded-xl drop-shadow-md shadow-black/20" style="object-fit: cover;height: 100%;width: 100%;"/>
            </div>
            
        </div>
    </div>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>