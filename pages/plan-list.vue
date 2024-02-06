<style>
body {
    background-color: #f0f0f0;
    font-family: 'Kanit', sans-serif;
}
</style>
<script setup lang="ts">

definePageMeta({
  layout: 'defaultmain',
});

const loginStatus = ref<Boolean>(true)
const plan_list = ref<string[]>([''])

const showPlanCreate = ref<boolean>(false)

const Data = {
    time: "11 / 12 / 2567",
    name: "สุโขทัย",
    detail: "ลองกระทง เผาเทียน เล่นไฟ ที่สุโขทัย"
}
const TravelDataTest = {
    image: "https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIVNrgcAuSEVpmdZwKSC23KlKAEMNBbMBJ7GEvpfzId6osBXpwm.jpg",
    title: "12 ที่เที่ยวสมุทรสงคราม ปักหมุดตลาดต้อง ไป แวะไหว้พระวัดดัง"
}

const LoginModalShow =  inject('LoginModalShow')

</script>
<template>
        <!-- <NuxtLayout name="defaultmain"> -->
            <div class="mb-8 px-12 2xl:px-24">
                <TravelGuide />
            </div>
            <div class="mb-6">
                <Menubar selectPage="แผนการท่องเที่ยว" />
            </div>
            <div class="max-w-[100dvw] px-12 2xl:px-24">
                <!-- กรณีไม่ได้ login-->
                <template v-if="loginStatus == false && plan_list.length == 0">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto">รายการแผนการท่องเที่ยว</p>

                    </div>

                    <!-- สร้างแผนการเพิ่ม -->
                    <div class="max-w-[100%] h-[30dvh] flex items-center justify-center">
                        <div class="flex flex-col w-fit h-fit">
                            <p class="mb-4 text-[36px] font-medium leading-[50px]">กรุณาเข้าสู่ระบบเพื่อวางแผนการท่องเที่ยว</p>

                            <button 
                            class="mx-auto w-[240px] h-[48px] bg-[#F9A825] rounded-md flex items-center justify-center border-2 border-black"
                            @click="LoginModalShow"
                            >
                                <font-awesome-icon :icon="['fas', 'user']" class="mr-4 text-[30px] leading-8 text-white" />
                                <p class="text-[22px] font-medium leading-[24px] text-white">เข้าสู่ระบบ</p>
                            </button>
                        </div>
                    </div>

                </template>
                <!-- กรณีไม่มีแผนการ -->
                <template v-else-if="loginStatus == true && plan_list.length == 0">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto">รายการแผนการท่องเที่ยว</p>

                        <button 
                            class="w-[280px] h-[48px] bg-[#FFFFFF] rounded-md border-2 border-black flex items-center justify-center "
                            @click="() => showPlanCreate = true"
                        >
                            <font-awesome-icon :icon="['fas', 'calendar-plus']" class="text-[30px] leading-8 mr-3" />
                            <p class="text-[22px] font-medium leading-[26px]">สร้างแผนการเพิ่ม</p>
                        </button>

                    </div>

                    <!-- สร้างแผนการเพิ่ม -->
                    <div class="max-w-[100%] h-[30dvh] flex items-center justify-center">
                        <div class="flex flex-col w-fit h-fit">
                            <p class="mb-4 text-[36px] font-medium leading-[50px]">ท่านยังเคยไม่มีแผนการท่องเที่ยว</p>

                            <button 
                                class="mx-auto w-[240px] h-[44px] bg-[#F9A825] rounded-md border-2 border-black flex items-center justify-center"
                                @click="() => showPlanCreate = true"
                            >
                                <font-awesome-icon :icon="['fas', 'calendar-plus']" class="mr-4 text-[30px] leading-8 text-white" />
                            <p class="text-[22px] font-medium leading-[26px] text-white">สร้างแผนการเพิ่ม</p>

                        </button>
                        </div>
                    </div>

                </template>

                <!-- กรณีมีแผนการ -->
                <template v-else-if="loginStatus == true && plan_list.length > 0">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto">รายการแผนการท่องเที่ยว</p>

                        <button 
                            class="w-[280px] h-[48px] bg-[#FFFFFF] rounded-md border-2 border-black flex items-center justify-center"
                            @click="() => showPlanCreate = true"
                        >
                            <font-awesome-icon :icon="['fas', 'calendar-plus']" class="text-[30px] leading-8 mr-3" />
                            <p class="text-[22px] font-medium leading-[26px]">สร้างแผนการเพิ่ม</p>
                        </button>

                    </div>

                    <!-- สร้างรายการแผนการ -->
                    <div class="max-w-[100%] h-fit grid grid-cols-3 gap-x-[5%] gap-y-8">

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" />
                        </div>

                    </div>

                    <div class="max-w-[100dvw] my-8 pt-2 pb-4 2xl:px-24">
                        <div class="w-[100%] bg-[#F9A825] h-[2px] "></div>
                    </div>

                    <div class="w-fit h-fit mx-auto mb-12">
                        <ImageGallaryPlan />
                    </div>

                </template>

            </div>
        <!-- </NuxtLayout> -->
        <ClientOnly>
        <div v-show="showPlanCreate">
                <ModalPlanCreate :modalCloseShow="() => showPlanCreate = false" :show="showPlanCreate" />
        </div>
        </ClientOnly>   
</template>
