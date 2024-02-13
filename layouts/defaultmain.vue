<script setup lang="ts">
const loginShow = ref<boolean>(false)

 function LoginModalShow() {
     loginShow.value = true
}
provide('LoginModalShow', LoginModalShow)

const language = ref<object>(await GetLanguge('th'));
const lang_code = ref<string>('th')

async function setLanguage(code:string) {
    language.value = await GetLanguge(code)

    lang_code.value = code
    console.log(language.value);
}

provide('language_code', lang_code)
provide('language', language)
</script>
<style>
body {
    background-color: #f0f0f0;
    overflow-y: hidden;
}
</style>
<template>
        <div id="main" class="overflow-x-hidden overflow-y-auto h-[100dvh]">
            <Navbar :LoginModal="() => loginShow = true" :setLanguage="setLanguage" />
            <slot />
            <div class="max-w-[100dvw]">
                <FooterWeb />
            </div>
            <div v-show="loginShow">
                <ModalLogin :LoginClose="() => loginShow = false" :show="loginShow" />
            </div>
        </div>
</template>