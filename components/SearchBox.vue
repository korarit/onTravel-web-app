<script setup>
const language = ref(inject('language'))


const keyword_seacrh = ref("")

async function GoSearch() {
    if (keyword_seacrh.value != "") {
        await navigateTo({
            path: '/search',
            query: {
                keyword: keyword_seacrh.value
            }
        })
    }
}
</script>


<template>
        <div class="w-full h-full bg-[#FBC02D] rounded-3xl flex">

            <div class="w-[10%] flex items-center">
                <font-awesome-icon class="text-black h-[20px] mx-auto my-auto text-[1.4rem]" :icon="['fas', 'search']" />
            </div>

            <input
                class="w-[70%] h-full placeholder-black text-black text-[1.2rem] bg-transparent font-medium focus:outline-none"
                type="text" :placeholder="language.search" v-model="keyword_seacrh" @keyup.enter="GoSearch()" />

            <button @click="GoSearch()" class="w-[20%] h-full bg-black rounded-3xl flex justify-center items-center">
                <p class="text-[1.2rem] font-semibold text-white">{{ language.search }}</p>
            </button>
        </div>
</template>