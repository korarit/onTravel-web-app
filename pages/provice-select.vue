<style>
body {
    background-color: #f0f0f0;
    font-family: 'Kanit', sans-serif;
}
</style>
<script setup>
import ProvinceName from "~/assets/json/province_name.json"

definePageMeta({
  layout: 'defaultmain',
});

const zoneselect = ref("all")
const province = ref("")

const Data = ref({
    time: "11 / 12 / 2567",
    name: "สุโขทัย",
    detail: "ลองกระทง เผาเทียน เล่นไฟ ที่สุโขทัย"
})

function selectZone(nameZone) {
    if (nameZone == zoneselect.value) {
        zoneselect.value = "all"
    }else{
        zoneselect.value = nameZone
    }
}
const lang_code = await inject('language_code')
watch(lang_code, (value) => {
    console.log('zerotest',value)
})
async function changeProvince(idProvince) {
    if (idProvince === "") {
        province.value = ""
        return
    }
    province.value = ProvinceName[idProvince][lang_code.value]
}

////////////////////// แปลภาษา ///////////////////////
const language = ref(inject('language'))

</script>
<template>
    <ClientOnly>
        <!-- <NuxtLayout name="defaultmain"> -->
            <div class="mb-8 px-12 2xl:px-24">
                <TravelGuide />
            </div>
            <div class="mb-6">
                <Menubar selectPage="สถานที่ในจังหวัด" />
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24">
                <!-- แผนที่ประเทศไทย + card ภาค -->
                <div class="max-w-[100%] flex justify-between">
                    <div class="w-[45%] h-[80dvh]">

                        <!-- แผนที่ ภาคใต้ -->
                        <MapsThailandSouth :Province="changeProvince" v-if="zoneselect == 'south'" />

                        <!-- แผนที่ ภาคเหนือ -->
                        <MapsThailandNorth :Province="changeProvince" v-else-if="zoneselect == 'north'" />

                        <!-- แผนที่ ภาคกลาง -->
                        <MapsThailandCenter :Province="changeProvince" v-else-if="zoneselect == 'center'" />

                        <!-- แผนที่ ภาคตะวันออกเฉียงเหนือ -->
                        <MapsThailandNortheast :Province="changeProvince" v-else-if="zoneselect == 'northeast'" />

                        <!-- แผนที่ ทั้งประเทศ -->
                        <MapsThailand :Province="changeProvince" v-else-if="zoneselect == 'all'"/>

                    </div>
                    <!-- ส่วนของ card-->
                    <div class="w-[52%] h-[80dvh] flex items-stretch flex-col">
                        <!-- แสดงชื่อจังหวัด -->
                        <p class="text-[24px] mt-auto font-bold select-none">{{ language.page.province_select.select_province }} <span class="text-[#F9A825]">{{ province }}</span></p>

                        <!-- สำหรับกดเพื่อแสดงแผนที่ ในภาคต่างๆ -->
                        <div class="w-[100%] my-auto grid grid-cols-2 gap-6 place-content-center">

                            <!-- card ภาคเหนือ -->
                            <div class="w-[100%] h-[25dvh]">
                                <CardMapZone 
                                    image="https://blueskyproperty.co.th/wp-content/uploads/2023/05/Apr5-1-1024x683.jpg" 
                                    :title="language.page.province_select.north" 
                                    :use="zoneselect === 'north' ? true : false"
                                    :setUse="() => selectZone('north')"
                                />
                            </div>

                            <!-- card ภาคกลาง -->
                            <div class="w-[100%] h-[25dvh]">
                                <CardMapZone 
                                    image="https://www.thailand.go.th/uploads/posts/photo_1673948909_1.jpeg" 
                                    :title="language.page.province_select.central" 
                                    :use="zoneselect === 'center' ? true : false"
                                    :setUse="() => selectZone('center')"
                                />
                            </div>

                            <!-- card ภาคตะออกเฉียงเหนือ -->
                            <div class="w-[100%] h-[25dvh]">
                                <CardMapZone 
                                    image="https://ik.imagekit.io/tvlk/blog/2022/06/%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B9%82%E0%B8%9A%E0%B8%81.jpg?tr=dpr-2,w-675" 
                                    :title="language.page.province_select.northeast" 
                                    :use="zoneselect === 'northeast' ? true : false"
                                    :setUse="() => selectZone('northeast')"
                                />
                            </div>

                            <!-- card ภาคใต้ -->
                            <div class="w-[100%] h-[25dvh]">
                                <CardMapZone 
                                    image="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/33000/33610-Angthong-National-Park.jpg" 
                                    :title="language.page.province_select.south" 
                                    :use="zoneselect === 'south' ? true : false"
                                    :setUse="() => selectZone('south')"
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-[100dvw] my-8 px-12 2xl:px-24">
                <div class="w-[100%] bg-[#F9A825] h-[2px] "></div>
            </div>

            <div class="max-w-[100dvw] px-12 2xl:px-24 mb-12">
                <p class="text-[28px] font-bold mr-auto mb-6">{{ language.page.province_select.calendar }}</p>

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
        <!-- </NuxtLayout> -->
    </ClientOnly>
</template>
