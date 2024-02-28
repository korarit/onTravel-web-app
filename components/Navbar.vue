<style>
@import url("~/assets/css/navbar.css");
</style>
<script setup lang="ts">
const props = defineProps<{
    profileShow: Boolean
    profileModal: Function
    profileModalClose: Function
    LoginModal: Function
    setLanguage: Function
    LoginStatus: string
}>();

function ChangeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    props.setLanguage(value)

    localStorage.setItem('language', value)

    console.log(value);
}

function OpenProfile() {
    if (props.profileShow) {
        setTimeout(() => {
            props.profileModalClose()
        }, 5);
    }else{
        setTimeout(() => {
            props.profileModal()
        }, 5);
    }
}

</script>
<template>
    <ClientOnly>
        <div class="w-[100dvw] z-[1000] h-[70px] bg-[#F9A825] px-12 2xl:px-24 flex items-center drop-shadow-lg">
            <div class="h-[80%] flex items-center">
                <NuxtLink to="/" class="w-full h-full" aria-label="click to black homepage">
                    <img src="/logo.svg" alt="logo-web" style="height: 100%;">
                </NuxtLink>
            </div>
            <div class="w-auto h-[44px] ml-auto flex items-center">

                <div class="w-[200px] h-[38px] rounded-xl bg-white mr-4 flex">
                    <div class="w-[40px] h-full bg-[#cfcfcf] rounded-l-xl border-r border-black flex items-center justify-center">
                        <img src="/icon/translate_icon.svg" class="w-[26px] h-[26px] mx-auto" alt="search_icon">
                    </div>
                    <select @change="ChangeLanguage" class="w-[160px] h-full bg-transparent focus:outline-none text-center text-[18px] select-transalte shadow-inner">
                        <option value="th">ภาษาไทย</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <button v-if="LoginStatus != 'authenticated'" @click="LoginModal()" class="w-auto h-[44px] rounded-lg bg-white border-2 border-black flex items-center px-4">
                    <img src="/icon/user_icon.svg" class="w-[32px] h-[32px]" alt="user_icon">
                    <p class="ml-2 text-[18px] font-semibold">เข้าสู่ระบบ</p>
                </button>
                <button v-else @click="OpenProfile()" class=" h-[48px] w-[48px] flex items-center justify-center rounded-full bg-white">
                    <img src="/icon/user_icon.svg" class="w-[36px] h-[36px]" alt="user_icon">
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