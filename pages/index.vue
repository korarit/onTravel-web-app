<style>
body {
    background-color: #f0f0f0;
    font-family: 'Kanit', sans-serif;
}
</style>
<script setup>
definePageMeta({
  layout: false,
})

const Data = {
    time: "11 / 12 / 2567",
    name: "สุโขทัย",
    detail: "ลองกระทง เผาเทียน เล่นไฟ ที่สุโขทัย"
}
const TravelDataTest = {
    image: "https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIVNrgcAuSEVpmdZwKSC23KlKAEMNBbMBJ7GEvpfzId6osBXpwm.jpg",
    title: "12 ที่เที่ยวสมุทรสงคราม ปักหมุดตลาดต้อง ไป แวะไหว้พระวัดดัง"
}
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
    <div>
        <NuxtLayout name="defaultmain">
            <div class="mb-8 px-12 2xl:px-24">
                <TravelGuide />
            </div>
            <div class="mb-6">
                <Menubar selectPage="หน้าหลัก" />
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24">

                <!-- หัวข้อ + ช่องค้นหา -->
                <div class="w-[100%] flex items-center mb-6">
                    <p class="text-[28px] font-bold mr-auto">สถานที่ท่องเที่ยวแนะนำ</p>

                    <div class="w-[30%] h-[44px] bg-[#FBC02D] rounded-3xl flex">

                        <div class="w-[10%] flex items-center">
                            <font-awesome-icon 
                                class="text-black h-[20px] mx-auto my-auto text-[1.4rem]"
                                :icon="['fas', 'search']" 
                            />
                        </div>

                        <input
                            class="w-[70%] h-[44px] placeholder-black text-black text-[1.2rem] bg-transparent font-medium focus:outline-none"
                            type="text" placeholder="ค้นหา" v-model="keyword_seacrh" @keyup.enter="GoSearch()" 
                        />

                        <button @click="GoSearch()" class="w-[20%] h-[44px] bg-black rounded-3xl flex justify-center items-center">
                            <p class="text-[1.2rem] font-semibold text-white">ค้นหา</p>
                        </button>
                    </div>

                </div>

                <!-- รายการสถานที่แนะนำ -->
                <div class="max-w-[100%] grid grid-cols-3 gap-x-[5%] gap-y-8">
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" />
                    </div>
                </div>
            </div>

            <div class="max-w-[100dvw] my-8 px-12 2xl:px-24">
                <div class="w-[100%] bg-[#F9A825] h-[2px] "></div>
            </div>

            <div class="max-w-[100dvw] px-12 2xl:px-24">
                <p class="text-[28px] font-bold mr-auto mb-6">ปฎิทินการท่องเที่ยว ททท</p>

                <div class="w-[100%] flex space-x-[5%]">
                    <div class="w-[30%]">
                        <ItemCalendarTravel :dataItem="Data" />
                    </div>
                    <div class="w-[30%]">
                        <ItemCalendarTravel :dataItem="Data" />
                    </div>
                    <div class="w-[30%]">
                        <ItemCalendarTravel :dataItem="Data" />
                    </div>
                </div>
            </div>

            <div class="max-w-[100dvw] px-12 2xl:px-24 flex space-x-[2%] my-12">
                <div class="w-[48%]">
                    <img src="https://www.kasikornresearch.com/SiteCollectionDocuments/analysis/business/tourism/Th2Th_Banner.jpg"
                        class="h-[500px] w-[100%] rounded-xl drop-shadow-lg" />
                </div>
                <div class="w-[50%] min-h-[100%] flex flex-col">
                    <p class="text-[32px] font-semibold underline text-center my-auto">ทานอาหารบรรยากาศส่วนตัว ริมน้ำ</p>
                    <button class="w-[20%] h-[50px] rounded-3xl bg-black text-white text-[24px] ml-auto">ติดต่อเรา</button>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
