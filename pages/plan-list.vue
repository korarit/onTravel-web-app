<style>
body {
    background-color: #f0f0f0;
    font-family: 'Kanit', sans-serif;
}
</style>
<script setup lang="ts">

definePageMeta({
  layout: 'defaultmain',
  auth: false
});

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

const UseLoginModal:any =  inject('LoginModalShow')
console.log(UseLoginModal)


const list_image_url = ref<String[]>([
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
    'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
]);

////////////////////// แปลภาษา ///////////////////////
const language = ref<any>(inject('language'))

const {data, status, getSession} = useAuth()
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
                <template v-if="status != 'authenticated'">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto">{{ language.page.plan_list.title }}</p>

                    </div>

                    <!-- เข้าสู่ระบบ -->
                    <div class="max-w-[100%] h-[40dvh] flex items-center justify-center">
                        <div class="flex flex-col w-fit h-fit">
                            <p class="mb-4 text-[36px] font-medium leading-[50px]">{{ language.page.plan_list.please_login }}</p>

                            <button 
                            class="mx-auto w-[240px] h-[48px] bg-[#F9A825] rounded-md flex items-center justify-center border-2 border-black"
                            @click="UseLoginModal"
                            >
                                <font-awesome-icon :icon="['fas', 'user']" class="mr-4 text-[30px] leading-8 text-white" />
                                <p class="text-[22px] font-medium leading-[24px] text-white">{{ language.page.plan_list.login }}</p>
                            </button>
                        </div>
                    </div>

                </template>
                <!-- กรณีไม่มีแผนการ -->
                <template v-else-if="status == 'authenticated' && plan_list.length == 0">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto"> {{ language.page.plan_list.title }}</p>

                        <button 
                            class="w-[280px] h-[48px] bg-[#FFFFFF] rounded-md border-2 border-black flex items-center justify-center "
                            @click="() => showPlanCreate = true"
                        >
                            <font-awesome-icon :icon="['fas', 'calendar-plus']" class="text-[30px] leading-8 mr-3" />
                            <p class="text-[22px] font-medium leading-[26px]">{{ language.page.plan_list.create }}</p>
                        </button>

                    </div>

                    <!-- สร้างแผนการเพิ่ม -->
                    <div class="max-w-[100%] h-[30dvh] flex items-center justify-center">
                        <div class="flex flex-col w-fit h-fit">
                            <p class="mb-4 text-[36px] font-medium leading-[50px]">{{ language.page.plan_list.no_plan }}</p>

                            <button 
                                class="mx-auto w-[240px] h-[44px] bg-[#F9A825] rounded-md border-2 border-black flex items-center justify-center"
                                @click="() => showPlanCreate = true"
                            >
                                <font-awesome-icon :icon="['fas', 'calendar-plus']" class="mr-4 text-[30px] leading-8 text-white" />
                            <p class="text-[22px] font-medium leading-[26px] text-white">{{ language.page.plan_list.create }}</p>

                        </button>
                        </div>
                    </div>

                </template>

                <!-- กรณีมีแผนการ -->
                <template v-else-if="status == 'authenticated' && plan_list.length > 0">

                    <!-- หัวข้อ + ปุ่ม -->
                    <div class="w-[100%] flex items-center mb-6">
                        <p class="text-[28px] font-bold mr-auto"> {{ language.page.plan_list.title }}</p>

                        <button 
                            class="w-[280px] h-[48px] bg-[#FFFFFF] rounded-md border-2 border-black flex items-center justify-center"
                            @click="() => showPlanCreate = true"
                        >
                            <font-awesome-icon :icon="['fas', 'calendar-plus']" class="text-[30px] leading-8 mr-3" />
                            <p class="text-[22px] font-medium leading-[26px]">{{ language.page.plan_list.create }}</p>
                        </button>

                    </div>

                    <!-- สร้างรายการแผนการ -->
                    <div class="max-w-[100%] h-fit grid grid-cols-3 gap-x-[5%] gap-y-8">

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="1" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="2" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="3" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="4" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="5" />
                        </div>

                        <div class="w-[100%]">
                            <ItemPlanCard :dataItem="TravelDataTest" :id="6" />
                        </div>

                    </div>

                    <div class="max-w-[100dvw] my-8 pt-2 pb-4 2xl:px-24">
                        <div class="w-[100%] bg-[#F9A825] h-[2px] "></div>
                    </div>

                    <div class="w-fit h-fit mx-auto mb-[50px]">
                        <ImageGallaryPlan />
                    </div>

                </template>

            </div>
        <!-- </NuxtLayout> -->
        <ClientOnly>
            <div v-if="showPlanCreate">
                    <ModalPlanCreate :modalCloseShow="() => showPlanCreate = false" :show="showPlanCreate" />
            </div>
        </ClientOnly>   
</template>
