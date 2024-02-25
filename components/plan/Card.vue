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
    ModalData: Function
}>();


</script>

<template>
  <div 
    :class="`flex-none rounded-xl w-[22.2dvw] h-[22.2dvw] 2xl:w-[20dvw] 2xl:h-[20dvw] inline-block relative ${CardData.image === '' ? 'bg-[#D9D9D9] shadow-inner   shadow-black/50' : '' } bg-center bg-cover bg-no-repeat`"
    :style="`${CardData.image !== '' ? 'background-image: url('+CardData.image+')' : ''}`"
  >
    
    <button @click="() => ModalData(CardData)" class="absolute min-h-[25%] top-16 left-[50%] right-[50%] -translate-x-[50%] w-[90%] flex justify-center bg-[#ffffffbc] text-center align-middle rounded-2xl">
        <p class=" font-bold text-2xl leading-[4rem] my-auto select-none">{{ CardData.title }}</p>
    </button>

    <div class="absolute bottom-[30px] left-[5%]">
        <div class="h-[3dvw] w-[3dvw] rounded-full bg-[#C0410C] flex  justify-center items-center select-none">
            <p class="text-[24px] font-medium">ME</p>
        </div>
    </div>

    <button @click="() => ModalData(CardData)" class="absolute top-[20px] right-[5%]">
        <div class="flex space-x-1">
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
            <div class="h-[0.7dvw] w-[0.7dvw] rounded-full bg-[#ffffffc8]"></div>
        </div>
    </button>

    
    <button v-if="CardData.image === ''" class="absolute bottom-[30px] right-[6%] select-none">
      <img src="/icon/image-upload.svg" style="height: 48px;">
    </button>

    
  </div>
</template>
