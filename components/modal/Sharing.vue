<script setup>

const props = defineProps({
    modalClose: Function,
    show: Boolean
})
////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))

const showTrasition = ref(false)
watch(() => props.show, (value) => {
    if (value) {
        showTrasition.value = true
    }
})
function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
    }, 320);
}

//url จาก config
const config = useRuntimeConfig()
//ดึง url ของหน้าเว็บ
const route = useRoute()
console.log(config.public.WEB_URL)
const url = ref(config.public.WEB_URL+route.path)

function Copy(){
    const copyElement = document.getElementById('copyInput')
    copyElement.select();
    copyElement.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(config.public.WEB_URL+route.path)
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");

</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-xl h-fit px-10 pb-10 w-[80dvw] lg:w-[60dvw] 2xl:w-[800px]">
                <!-- title -->
                <div class="modal-head h-fit w-full flex items-center mt-10">
                    <p class="w-[95%] flex items-center justify-center text-[30px] font-semibold h-fit leading-[2.6dvw]">แชร์ไปยังที่อื่น ๆ{{ language.modal.sharing.title }}</p>
                    <button @click="ModalClose()" class="flex items-center justify-center w-[5%] h-[2dvw]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[48px] font-bold cursor-pointer" />
                    </button>
                </div>

                <div class="grid grid-cols-6 gap-2 my-10">

                    <NuxtLink
                        :to="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
                        target="_blank"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300"
                    >
                        <img src="/icon/share/facebook.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Facebook</p>
                    </NuxtLink>

                    <NuxtLink
                        :to="`https://twitter.com/intent/tweet?url=${url}`"
                        target="_blank"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300"
                    >
                        <img src="/icon/share/twitter.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">X</p>
                    </NuxtLink>

                    <NuxtLink
                        :to="`https://api.whatsapp.com/send?text=${url}`"
                        target="_blank"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300"
                    >
                        <img src="/icon/share/whatsapp.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Whatsapp</p>
                    </NuxtLink>

                    <NuxtLink
                        :to="`https://reddit.com/submit?url=${url}`"
                        target="_blank"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300"
                    >
                        <img src="/icon/share/reddit.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Reddit</p>
                    </NuxtLink>

                    <NuxtLink
                        :to="`https://vk.com/share.php?url=${url}`"
                        target="_blank"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300"
                    >
                        <img src="/icon/share/vk.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Vk</p>
                    </NuxtLink>

                    <NuxtLink
                        :to="`mailto:?body=${url}`"
                        class="w-full h-fit flex flex-col rounded-lg p-2 hover:bg-gray-300">
                        <img src="/icon/share/email.svg" class="w-[80%] mb-3 mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Email</p>
                    </NuxtLink>

                </div>

                <div class="w-full h-[70px] border border-black rounded-2xl px-[12px] py-[6px] flex items-center justify-between">

                    <input id="copyInput" readonly class="text-[22px] rounded-lg py-[1px] w-[70%] select-none" :value="`${url}`" />
                    <button
                        @click="Copy"
                        class="w-[27%] border-2 border-black bg-[#F9A825] select-none hover:bg-[#d49542] active:bg-[#d49542] h-full rounded-2xl text-white font-medium text-[28px]">
                        {{ language.modal.sharing.copy }}
                    </button>
                </div>
            </div>
            </Transition>

        </div>
    </ClientOnly>
</template>