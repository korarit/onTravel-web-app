<script setup>
definePageMeta({
  layout: 'defaultmain',
  auth: 'auth'
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2  mb-24 mt-24 px-12 2xl:px-24  gap-16">
    <NuxtLink to="place" class=" w-full bg-cover bg-center border-black border-2 rounded-2xl shadow-md shadow-black/40 relative h-[50dvh]" style="background-image: url('/img/select-type-place-1.png');">

      <div
        class="absolute min-h-[25%] left-[50%] right-[50%] -translate-x-[50%] top-[30%] w-[85%] flex justify-center bg-[#ffffff] text-center align-middle rounded-2xl">
        <p class=" font-bold text-2xl leading-[4rem] my-auto select-none">สร้างบัญชีสถานที่ท่องเที่ยว</p>
      </div>

      

      <div class=" flex items-center justify-center bg-[#ffffff] rounded-full absolute bottom-8 left-7 w-[64px] h-[64px]">
        <img src="/icon/user_icon.svg" class="w-[48px] h-[48px]" alt="user_icon">
      </div>

    </NuxtLink>

    <NuxtLink to="hotel" class="w-full bg-cover bg-center border-black border-2 shadow-md shadow-black/40 rounded-2xl relative h-[50dvh]" style="background-image: url('/img/select-type-place-2.png');">

      <div
        class="absolute min-h-[25%] left-[50%] right-[50%] -translate-x-[50%] top-[30%] w-[85%] flex justify-center bg-[#ffffff] text-center align-middle rounded-2xl">
        <p class=" font-bold text-2xl leading-[4rem] my-auto select-none">สร้างบัญชีที่พัก</p>
      </div>

      <div class=" flex items-center justify-center bg-white rounded-full absolute bottom-8 left-7 w-[64px] h-[64px] ">
        <img src="/icon/user_icon.svg" class="w-[48px] h-[48px]" alt="user_icon">
      </div>

    </NuxtLink>

  </div>
</template>

<style>
body {
  font-family: "Kanit", sans-serif;
}</style>
