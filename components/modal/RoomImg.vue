<script setup>

const props = defineProps({
    modalClose: Function,
    show: Boolean,
    ImageList: Array
})
////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))

const showTrasition = ref(false)
watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })

function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
    }, 320);
}

//url จาก config
const config = useRuntimeConfig()
</script>
<style scoped>
@import url("~/assets/css/modal.css");

</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="w-[90dvw] lg:w-[80dvw] 2xl:w-[70dvw]">
                <!-- title -->
                <div class="modal-head h-fit w-full flex items-center">
                    <button @click="ModalClose()" class="flex items-center w-full h-[2dvw]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="ml-auto text-[48px] font-bold cursor-pointer text-white" />
                    </button>
                </div>

                <div class="p-6 w-full">
                    <ImgaeGallary :ImageList="ImageList" />
                </div>

            </div>
            </Transition>

        </div>
    </ClientOnly>
</template>