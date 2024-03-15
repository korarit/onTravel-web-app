<script setup lang="ts">
import { defineProps } from 'vue'

type dataItem = {
    image: string,
    title: string,
}
const props = defineProps<{
    dataItem: dataItem
    id: number  
}>();

// แปลภาษา
const text_to_transalte = ref<string>("")
const lang_code = ref<string | undefined>(await inject('language_code'))

async function transalte_text(text:string) {
    if(lang_code.value == undefined) return text
    const result = await GGTranslate(text, lang_code.value)
    text_to_transalte.value = result
}   
onMounted(async () => {
    await transalte_text(props.dataItem.title)
})
watch(lang_code, async (value) => {
    await transalte_text(props.dataItem.title)
})

</script>
<template>
    <ClientOnly>
        <NuxtLink :to="`/place/${id}`" class="w-[100%] h-[100%]" >
        <div class="w-[100%] overflow-x-hidden" v-if="lang_code != undefined">
            <!-- รูปภาพตัวอย่าง -->
            <div class="w-[100%] h-[250px] mb-4">
                <img :src="dataItem.image" alt="image of place" class="object-cover drop-shadow-md rounded-xl w-[100%] h-[100%]">
            </div>

            <p class="text-[20px] text-justify">
                {{ text_to_transalte }}
            </p>
        </div>
        </NuxtLink>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>