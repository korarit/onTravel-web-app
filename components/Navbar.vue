<style>
@import url("~/assets/css/navbar.css");
</style>
<script setup lang="ts">
const props = defineProps<{
    LoginModal: Function
    setLanguage: Function
}>();

function ChangeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    props.setLanguage(value)

    localStorage.setItem('language', value)

    console.log(value);
}

</script>
<template>
    <ClientOnly>
        <div class="w-[100dvw] h-[70px] bg-[#F9A825] px-12 2xl:px-24 flex items-center drop-shadow-lg">
            <p>Logo</p>
            <div class="w-[270px] h-[44px] ml-auto flex items-center">

                <div class="w-[200px] h-[38px] rounded-xl bg-white mr-4 flex">
                    <div class="w-[40px] h-full bg-[#cfcfcf] rounded-l-xl border-r border-black flex items-center justify-center">
                        <img src="/icon/translate_icon.svg" class="w-[26px] h-[26px] mx-auto" alt="search_icon">
                    </div>
                    <select @change="ChangeLanguage" class="w-[160px] h-full bg-transparent focus:outline-none text-center text-[18px] select-transalte shadow-inner">
                        <option value="th">ภาษาไทย</option>
                        <option value="en">English</option>
                        <option value="zh">中国人</option>
                    </select>
                </div>

                <button @click="LoginModal()" class="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center">
                    <img src="/icon/user_icon.svg" class="w-[32px] h-[32px]" alt="user_icon">
                </button>
            </div>
        </div>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>