<script setup lang="ts">
const loginShow = ref<boolean>(false)

function LoginModalShow() {
    loginShow.value = true
}
provide('LoginModalShow', LoginModalShow)
</script>
<style>
body {
    background-color: #f0f0f0;
    overflow-y: hidden;
}
</style>
<template>
        <div id="main" class="overflow-x-hidden overflow-y-auto h-[100dvh]">
            <Navbar :LoginModal="() => loginShow = true" />
            <slot />
            <div class="max-w-[100dvw]">
                <FooterWeb />
            </div>
            <div v-show="loginShow">
                <ModalLogin :LoginClose="() => loginShow = false" :show="loginShow" />
            </div>
        </div>
</template>