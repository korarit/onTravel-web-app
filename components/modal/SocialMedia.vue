<script setup>
import { list } from 'postcss';


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

//list_social
const list_social = {
    facebook: {
        name: 'facebook',
        placeholder: 'Facebook URL',
        icon: ['fab', 'square-facebook']
    },
    x: {
        name: 'x',
        placeholder: 'Twitter URL',
        icon: ['fab', 'square-x-twitter']
    },
    whatsapp: {
        name: 'whatsapp',
        placeholder: 'Whatsapp URL',
        icon: ['fab', 'square-whatsapp']
    },
    line: {
        name: 'Line',
        placeholder: 'Line ID',
        icon: ['fab', 'square-line']
    },
    vk: {
        name: 'vk',
        placeholder: 'Vk URL',
        icon: ['fab', 'vk']
    },
    instagram: {
        name: 'instagram',
        placeholder: 'Instagram URL',
        icon: ['fab', 'square-instagram']
    },
    youtube: {
        name: 'youtube',
        placeholder: 'Youtube URL',
        icon: ['fab', 'square-youtube']
    },
    pinterest: {
        name: 'pinterest',
        placeholder: 'Pinterest URL',
        icon: ['fab', 'square-pinterest']
    },
    threads: {
        name: 'threads',
        placeholder: 'Threads URL',
        icon: ['fab', 'square-threads']
    },
    googleplus: {
        name: 'google_plus',
        placeholder: 'Google Plus URL',
        icon: ['fab', 'square-google-plus']
    },
    tumblr: {
        name: 'tumblr',
        placeholder: 'Tumblr URL',
        icon: ['fab', 'square-tumblr']
    },
    phone: {
        name: 'phone',
        placeholder: 'Phone Number',
        icon: ['fas', 'square-phone']
    }

}

const emit = defineEmits(['chooseSocial'])

function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
    }, 320);
}

const select_social = ref('')

function selectSocial(social){
    if(select_social.value === social){
        select_social.value = ''
        return
    }
    select_social.value = social
}

function ChooseContact(){
    if(select_social.value === ''){
        return
    }
    emit('chooseSocial', list_social[select_social.value])
    ModalClose()
    select_social.value = ''
}
</script>
<style scoped>
@import url("~/assets/css/modal.css");

</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-xl h-fit px-10 pb-10 w-[80dvw] lg:w-[60dvw] 2xl:w-[600px]">
                <!-- title -->
                <div class="modal-head h-fit w-full flex items-center mt-10">
                    <p class="w-[95%] flex items-center justify-center text-[30px] font-semibold h-fit leading-[2.6dvw]">เลือกช่องทางการติดต่อ</p>
                    <button @click="ModalClose()" class="flex items-center justify-center w-[5%] h-[2dvw]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[48px] font-bold cursor-pointer" />
                    </button>
                </div>

                <div class="grid grid-cols-4 gap-4 my-10">

                    <button
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'facebook' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('facebook')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-facebook']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Facebook</p>
                    </button>

                    <button
                    :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'x' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('x')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-x-twitter']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">X</p>
                    </button>

                    <button
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'whatsapp' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('whatsapp')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-whatsapp']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Whatsapp</p>
                    </button>

                    <button
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'line' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('line')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-reddit']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Reddit</p>
                    </button>

                    <button
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'vk' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('vk')"
                    >
                        <font-awesome-icon :icon="['fab', 'vk']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Vk</p>
                    </button>

                    <button 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'instagram' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('instagram')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-instagram']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Instagram</p>
                    </button>

                    <button 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'youtube' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('youtube')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-youtube']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Youtube</p>
                    </button>

                    <div 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'pinterest' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('pinterest')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-pinterest']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Pinterest</p>
                    </div>

                    <div 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'threads' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('threads')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-threads']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Threads</p>
                    </div>

                    <button 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'googleplus' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('googleplus')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-google-plus']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Google Plus</p>
                    </button>

                    <button 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'tumblr' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('tumblr')"
                    >
                        <font-awesome-icon :icon="['fab', 'square-tumblr']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Tumblr</p>
                    </button>

                    <button 
                        :class="`w-full h-fit flex flex-col rounded-lg p-2 ${select_social === 'phone' ? 'bg-green-600 text-white' : 'hover:bg-gray-300'}`"
                        @click="selectSocial('phone')"
                    >
                        <font-awesome-icon :icon="['fas', 'square-phone']" class="text-[64px] mx-auto" />
                        <p class="text-[20px] font-medium flex justify-center w-full">Phone</p>
                    </button>

                </div>

                <button
                    @click="ChooseContact"
                    class="w-full h-[54px] border-2 border-black bg-[#F9A825] select-none hover:bg-[#d49542] active:bg-[#d49542] rounded-xl text-white font-medium text-[24px]">
                        เพิ่มช่องทางการติดต่อ
                </button>
            </div>
            </Transition>

        </div>
    </ClientOnly>
</template>