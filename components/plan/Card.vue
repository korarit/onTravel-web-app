<script setup lang="ts">
interface PlanCardType {
    id: number;
    title: string;
    description: string;
    image: string;
    view: number;
    review_point: number;
    start_time: string;
    end_time: string;

    owner_name: string;
    owner_lastname: string;
    owner_image: string;
}

const props = defineProps<{
    CardData: PlanCardType
}>();


</script>

<template>
  <div 
  class="flex-none rounded-xl w-[22.2dvw] h-[22.2dvw] inline-block relative bg-center bg-cover bg-no-repeat"
    :style="`background-image: url('${CardData.image}');`"
  >
    
    <div class="absolute min-h-[25%] top-16 left-[50%] right-[50%] -translate-x-[50%] w-[90%] flex justify-center bg-[#ffffffbc] text-center align-middle rounded-2xl">
        <p class=" font-bold text-2xl leading-[4rem] my-auto select-none">{{ CardData.title }}</p>
    </div>

    <div class="absolute bottom-[30px] left-[5%]">
        <div class="h-[3dvw] w-[3dvw] rounded-full bg-[#C0410C] flex  justify-center items-center select-none">
            <p class="text-[24px] font-medium">ME</p>
        </div>
    </div>

    <div class="absolute top-[20px] right-[5%]">
        <div class="flex space-x-1">
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
        </div>
    </div>

    
  </div>
</template>
