<script setup lang="ts">
    defineProps<{
        selectPage: String
    }>();
</script>
<style>
.menu{
    @apply px-6 h-[50px] flex items-center hover:bg-[#9E9E9E];
}
.menu-active{
    @apply px-6 h-[50px] flex items-center bg-[#9E9E9E];
}
</style>
<template>
    <ClientOnly>
        <div class="w-[100dvw] h-[50px] relative flex justify-center select-none">
            <div class="absolute w-auto h-[50px] bg-[#F9A825] z-10 rounded-t-xl">
                <div class="w-[100%] h-[50px] flex items-center">

                    <NuxtLink to="/" v-bind:class="(selectPage === 'หน้าหลัก') ? 'menu-active rounded-tl-xl' : 'menu rounded-tl-xl'">
                        <p class="text-[1.2rem] font-semibold text-slate-100">หน้าหลัก</p>
                    </NuxtLink>
                    <NuxtLink to="/hotels" v-bind:class="(selectPage === 'ที่พักแนะนำ') ? 'menu-active' : 'menu'">
                        <p class="text-[1.2rem] font-semibold text-slate-100">ที่พักแนะนำ</p>
                    </NuxtLink>
                    <NuxtLink to="/plan-list" v-bind:class="(selectPage === 'แผนการท่องเที่ยว') ? 'menu-active' : 'menu'">
                        <p class="text-[1.2rem] font-semibold text-slate-100">แผนการท่องเที่ยว</p>
                    </NuxtLink>
                    <NuxtLink to="/provice-select" v-bind:class="(selectPage === 'สถานที่ในจังหวัด') ? 'menu-active' : 'menu'">
                        <p class="text-[1.2rem] font-semibold text-slate-100">สถานที่ในจังหวัด</p>
                    </NuxtLink>
                    <NuxtLink to="/auth/register" class="px-6 h-[50px] flex items-center hover:bg-[#9E9E9E] hover:text-white rounded-tr-xl">
                        <p class="text-[1.2rem] font-semibold text-slate-100">สมัครสมาชิก</p>
                    </NuxtLink>
                </div>
            </div>
            <div class="self-end w-[100dvw] h-[6px] bg-[#F9A825] z-0"></div>
        </div>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>