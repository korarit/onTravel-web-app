<script setup>

const TravelDataTest = {
    image: "https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIVNrgcAuSEVpmdZwKSC23KlKAEMNBbMBJ7GEvpfzId6osBXpwm.jpg",
    title: "12 ที่เที่ยวสมุทรสงคราม ปักหมุดตลาดต้อง ไป แวะไหว้พระวัดดัง",
    point: 4.5,
    views: 16400
}

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.keyword)
const newkeyword = ref("")
const search_status = ref(true)
function search() {
    if (newkeyword.value != "") {
        keyword.value = newkeyword.value
        //เปลี่ยนค่าใน url
        router.push({ query: { keyword: newkeyword.value } })
    }
}
</script>
<script lang="ts">

</script>
<style>
body{
    font-family: 'Kanit', sans-serif;
}
</style>
<template>
    <ClientOnly>
        <NuxtLayout name="defaultmain">
            <div class="mb-8 px-12 2xl:px-24">
            <TravelGuide />
            </div>
            <div class="mb-6">
                <Menubar selectPage="ที่พักแนะนำ" />
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24">

                <!-- หัวข้อ + ช่องค้นหา -->
                <div class="w-[100%] flex items-center mb-6">
                    <p class="text-[28px] font-bold mr-auto">
                        {{ (keyword === undefined || keyword === '' || keyword === null) ? 'ที่พักแนะนำ' : `ผลลัพธ์การค้นหา : ${keyword}`}}
                    </p>
                    <div class="w-[30%] h-[44px] bg-[#FBC02D] rounded-3xl flex">

                        <div class="w-[10%] flex items-center">
                            <font-awesome-icon
                                class="text-black h-[20px] mx-auto my-auto text-[1.4rem]"
                                :icon="['fas', 'search']"
                            />
                        </div>

                        <input
                        class="w-[70%] h-[44px] placeholder-black text-black text-[1.2rem] bg-transparent font-medium focus:outline-none"
                        type="text"
                        placeholder="ค้นหา"
                        v-model="newkeyword"
                        @keyup.enter="search()"
                        />

                        <button 
                            class="w-[20%] h-[44px] bg-black rounded-3xl flex justify-center items-center"
                            @click="search"
                        >
                            <p class="text-[1.2rem] font-bold text-white">ค้นหา</p>
                        </button>
                    </div>

                </div>

                <!-- ผลการค้นหา -->
                <div class="max-w-[100%] h-fit">

                    <!-- กรณี ไม่พบผลลัพท์ใกล้เคียง -->
                    <template v-if="search_status === false">
                        <div class="w-[100%] h-[150px] flex items-center justify-center">
                            <p class="text-[32px] font-bold">ไม่พบผลลัพท์ที่ใกล้เคียงกับ คำค้นหา</p>
                        </div>
                    </template>

                    <!-- กรณี พบผลลัพท์ใกล้เคียง -->
                    <template v-else-if="search_status === true">
                        <div class="grid grid-cols-4 gap-x-[2%] gap-y-8 w-[100%]">
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                            <div class="w-[100%]">
                                <ItemSearch :dataItem="TravelDataTest" />
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Pagination -->
                <div class="w-[100%] h-fit flex justify-center mt-12">

                    <div class="shadow-md shadow-black/25 w-fit h-fit py-2 px-10 flex items-center rounded-full bg-[#E6E6E6]">

                        <button class="mr-5 flex justify-center items-center">
                            <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-[36px] leading-7 font-bold" />
                        </button>
                        <button class="mr-10 rounded-full h-[44px] w-[44px] bg-[#323232] flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold text-white">1</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">2</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">3</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">4</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">5</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">6</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">7</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">8</p>
                        </button>
                        <button class="mr-10 flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">. . .</p>
                        </button>
                        <button class="flex justify-center items-center select-none">
                            <p class="text-[28px] leading-7 font-bold">15</p>
                        </button>
                        <button class="ml-5 flex justify-center items-center">
                            <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[36px] leading-7 font-bold" />
                        </button>

                    </div>

                </div>
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24 my-12">
                <img src="https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp" class="rounded-xl w-[60%] mx-auto shadow-md shadow-black/20" />
            </div>
        </NuxtLayout>
    </ClientOnly>
</template>