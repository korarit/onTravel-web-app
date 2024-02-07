<script setup>
definePageMeta({
    layout: 'defaultmain',
});
</script>
<style scoped>
body {
        background-color: #f0f0f0;
        font-family: 'Kanit', sans-serif;
    }
</style>

<template>
    <div class="my-12 px-12 2xl:px-24 max-w-[100dvw] h-fit">
        <div class="mx-auto mb-12 relative w-[60%] h-[500px] bg-cover bg-center rounded-xl shadow-lg shadow-[#00000058]" style="background-image: url('/img/select-type-place-1.png');">

            <!-- หัวใจ -->
            <div class="absolute right-6 top-6">
                <font-awesome-icon :icon="['fas', 'heart']" class="text-[36px]" />
            </div>
            <!-- หัวข้อ -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white rounded-xl h-[30%] flex items-center justify-center space-x-2 select-none">
                <img src="/icon/cabstand.svg" class="w-[68px] h-[68px]" />
                <p class="text-[32px] font-bold leading-9">สร้างบัญชีสถานที่ท่องเที่ยว</p>
            </div>

            <!-- profile -->
            <div class="absolute left-6 bottom-6 rounded-full h-[60px] w-[60px] bg-[#C0410C] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-[36px]" />
            </div>

        </div>

        <div class="mx-auto relative w-[60%] h-[500px] bg-cover bg-center rounded-xl shadow-lg shadow-[#00000058]" style="background-image: url('/img/select-type-place-2.png');">

            <!-- หัวใจ -->
            <div class="absolute right-6 top-6">
                <font-awesome-icon :icon="['fas', 'heart']" class="text-[36px]" />
            </div>
            <!-- หัวข้อ -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white rounded-xl h-[30%] flex items-center justify-center space-x-2 select-none">
                <img src="/icon/apartment.svg" class="w-[68px] h-[68px]" />
                <p class="text-[32px] font-bold leading-9">สร้างบัญชีที่พัก</p>
            </div>

            <!-- profile -->
            <div class="absolute left-6 bottom-6 rounded-full h-[60px] w-[60px] bg-[#90BDF0] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-[36px]" />
            </div>
        </div>
    </div>
</template>