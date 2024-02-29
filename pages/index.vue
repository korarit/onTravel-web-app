<style>
body {
    background-color: #f0f0f0;
    font-family: 'Kanit', sans-serif;
}
</style>
<script setup>
definePageMeta({
  layout: 'defaultmain',
  auth: false
})
useHead({
  title: 'onTravel',
  htmlAttrs: {
    lang: 'en',
  }
})
useSeoMeta({
  title: 'onTravel',
  ogTitle: 'onTravel',
  description: 'เว็บไซต์ ontravel แนะนำสถานที่ท่องเที่ยวและ ที่พัก ในไทย',
  ogDescription: 'เว็บไซต์ ontravel แนะนำสถานที่ท่องเที่ยวและ ที่พัก ในไทย'
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

////////////////////// แปลภาษา ///////////////////////
const language = ref(inject('language'))
// watch(language, (value) => {
//     console.log(value.page);
// })
</script>
<template>
    <div>
        <!-- <NuxtLayout name="defaultmain"> -->
            <div class="mb-8 px-12 2xl:px-24">
                <TravelGuide />
            </div>
            <div class="mb-6">
                <Menubar selectPage="หน้าหลัก" />
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24">

                <!-- หัวข้อ + ช่องค้นหา -->
                <div class="w-[100%] flex items-center mb-6">
                    <p class="text-[28px] font-bold mr-auto">{{ language.page.home.travel_recommend }}</p>

                    <div class="w-[30%] h-[44px] ">
                        <SearchBox />
                    </div>

                </div>

                <!-- รายการสถานที่แนะนำ -->
                <div class="max-w-[100%] grid grid-cols-3 gap-x-[5%] gap-y-8">

                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="1" />
                    </div>

                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="2" />
                    </div>

                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="3" />
                    </div>

                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="4" />
                    </div>
                    
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="5" />
                    </div> 
                    
                    <div class="w-[100%]">
                        <ItemTravelGuide :dataItem="TravelDataTest" :id="6" />
                    </div>
                </div>
            </div>

            <div class="max-w-[100dvw] my-8 px-12 2xl:px-24">
                <div class="w-[100%] bg-[#F9A825] h-[2px] "></div>
            </div>

            <!-- รายการปฎิทินการท่องเที่ยว ททท -->
            <div class="max-w-[100dvw] px-12 2xl:px-24">
                <p class="text-[28px] font-bold mr-auto mb-6">{{ language.page.home.calendar }}</p>

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
        <!-- </NuxtLayout> -->
    </div>
</template>
