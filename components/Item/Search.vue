<script setup lang="ts">
type dataItem = {
    image: string,
    title: string,
    point: number,
    views: number,
}
const props = defineProps<{
    dataItem: dataItem,
    link: string
}>();

// แปลภาษา
const text_to_transalte = ref<string>("")
const lang_code = ref<string | undefined>(await inject('language_code'))

async function translate_text(text:string) {
    if(lang_code.value == undefined) return text
    const result = await GGTranslate(text, lang_code.value)
    text_to_transalte.value = result
}   
onMounted(async () => {
    await translate_text(props.dataItem.title)
})
watch(lang_code, async (value) => {
    await translate_text(props.dataItem.title)
})


</script>
<template>
    <ClientOnly>
        <NuxtLink :to="link" class="w-[100%] h-[100%]">
        <div class="w-[100%] h-[100%]">
            <!-- รูปภาพตัวอย่าง -->
            <div class="w-[100%] h-[250px] mb-4">
                <img :src="dataItem.image" class="object-cover drop-shadow-md rounded-xl w-[100%] h-[100%]">
            </div>

            <p class="text-[20px] text-justify">
                {{ text_to_transalte  }}
            </p>
            <div class="w-[100%] mt-auto">
                <div class="w-[100%] h-[2px] bg-black my-4"></div>

                <div class="w-[100%] flex">
                    <div class="flex items-center">
                        <font-awesome-icon :icon="['fas', 'star']" class="text-[20px] text-[#eab308]" />
                        <p class="text-[20px] ml-2 leading-6">{{ dataItem.point  }}</p>
                    </div>
                    <div class="ml-auto flex items-center">
                        <font-awesome-icon :icon="['fas', 'eye']" />
                        <p class="text-[20px] ml-2 leading-6">{{ dataItem.views.toLocaleString()  }}</p>
                    </div>
                </div>
            </div>
        </div>
        </NuxtLink>
    </ClientOnly>
</template>
<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>