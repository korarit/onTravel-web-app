<script setup lang="ts">
const loginShow = ref<boolean>(false)
const profileShow = ref<boolean>(false)

function LoginModalShow() {
    loginShow.value = true
}
provide('LoginModalShow', LoginModalShow)

const language = ref<object>(await GetLanguge('th'));
const lang_code = ref<string>('th')

async function setLanguage(code: string) {
    language.value = await GetLanguge(code)

    lang_code.value = code
    console.log(language.value);
}

provide('language_code', lang_code)
provide('language', language)

function closeProfile() {
    setTimeout(() => {
        profileShow.value = false
    }, 100);

}

const { data, status } = useAuth()

</script>
<style>
body {
    background-color: #f0f0f0;
    overflow-y: hidden;
}

.modal-enter-active {
    transition: all 0.3s ease-out;
}
  
  .modal-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
  
.modal-enter-from,
.modal-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

</style>
<template>
    <div id="main" class="overflow-x-hidden overflow-y-auto h-[100dvh]">
        <div class="relative w-[100dvw] h-[70px]">
            <Navbar class="w-full absolute top-0" 
                :profileShow="profileShow" 
                :profileModal="() => profileShow = true"
                :profileModalClose="() => closeProfile()" 
                :LoginModal="() => loginShow = true" 
                :setLanguage="setLanguage" 
                :LoginStatus="status"
            />

            <div v-if="status == 'authenticated'">
                <Transition name="modal">
                <div v-show="profileShow" class="absolute -bottom-[220px] right-12 2xl:right-24 z-[100]">
                    <ModalProfile :modalClose="() => closeProfile()" />
                </div>
                </Transition>
            </div>
        </div>
        <slot />
        <div class="max-w-[100dvw]">
            <FooterWeb />
        </div>
        <div v-if="loginShow">
            <ModalLogin :LoginClose="() => loginShow = false" :show="loginShow" />
        </div>
    </div>
</template>