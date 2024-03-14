<script setup lang="ts">
import mockup_data from '~/assets/json/mockup_plan.json'


definePageMeta({
  layout: 'defaultmain',
  auth: 'auth'
})

const {status, getSession} = useAuth();
//check logout
watch(status, (newStatus) => {
    if (newStatus === 'unauthenticated') {
        navigateTo('/')
    }
})

//สำหรับเงื่อนไขการแสดง modal
const shareModalShow = ref<boolean>(false);
const DateModalShow = ref<boolean>(false);
const cardModalShow = ref<boolean>(false);

const addCardModalShow = ref<boolean>(false);
const addCard_PlanIndex = ref<number | null>(null);
const TimeStampAdd = ref<number | null>(null);

const cardData = ref(null);
function cardModalData(Data: any) {
  cardModalShow.value = true

  cardData.value = Data
}

function addCardShow(index: number, TimeStamp: number) {
  addCardModalShow.value = true
  addCard_PlanIndex.value = index
  TimeStampAdd.value = TimeStamp
}

interface PlanCardType {
    id: number;
    title: string;
    description: string;
    image: string;
    view: number;
    review_point: number;
    start_time: string;
    end_time: string;

    owner_name: string;
    owner_lastname: string;
    owner_image: string;

    location: {
        lat: number;
        lon: number;
    }
}
interface PlanCardAdd {
    title: string;
    description: string;
    image: string;
    view: number;
    review_point: number;
    start_time: string;
    end_time: string;

    owner_name: string;
    owner_lastname: string;
    owner_image: string;

    location: {
        lat: number;
        lon: number;
    }
}
function addCardToPlan(data: PlanCardAdd) {

  let set_data:PlanCardType = {
    id: data_plan.value.length + 1,
    ...data
  }

  if (addCard_PlanIndex.value !== null) {
    data_plan.value[addCard_PlanIndex.value].plan.push(set_data)

    addCard_PlanIndex.value = null
  }
  console.log('test 1 23 3 4')
}

const data_plan = ref(mockup_data)

function addDate(TimeStamp: number) {
  data_plan.value.push({
    date_timestamp: TimeStamp,
    sort_type: "view_sorted",
    plan: []
  })
}

function removeDate(index: number) {
  data_plan.value.splice(index, 1)
}

</script>

<template>
  <div class="bg-gray-100 h-fit">
    <!-- header -->
    <div class="flex justify-between px-6 2xl:px-6 mt-12 h-auto">
      <h1 class="text-3xl font-bold">แผนการท่องเที่ยวไทย</h1>
      <div class="flex items-center ">
        <div class="mr-6 flex -space-x-5 h-fit">
          <div class="h-16 w-16 rounded-full bg-gray-500"></div>
          <div class="h-16 w-16 rounded-full bg-red-500"></div>
          <div class="h-16 w-16 rounded-full bg-blue-500"></div>
        </div>
        <button @click="() => shareModalShow = true"
          class="flex items-center justify-center text-white shadow-inner bg-[#0000005c] shadow-black/50 w-[8dvw] h-12 p-2 text-lg font-extrabold rounded-md ">
          <i class="fa-solid fa-user-plus"></i>
          Share
        </button>
      </div>

    </div>

    <!-- รายการแผน -->
    <div v-if="data_plan.length > 0">
      <PlanList  
      v-for="(item, index) in data_plan"
      :index="index"
      :dateTimestamp="item['date_timestamp']" 
      :ListPlan="item['plan']" 
      :remove="()=> removeDate(index)" 
      :AddCard="addCardShow"
      :showData="cardModalData" 
    />
    </div>


    <div class=" flex flex-col text-center w-fit mx-auto my-12">
      <button @click="() => DateModalShow = true"
        class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md shadow-black/30 w-[40dvw] mb-6 text-2xl">
        เพิ่มวันในแผนการ
      </button>
      <button class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md shadow-black/30 w-[40dvw] text-2xl">
        ยกเลิกแผนการทั้งหมด
      </button>
    </div>

    <div class="w-fit h-fit mx-auto mb-12">
      <ImageGallaryPlan />
    </div>
  </div>



  <ClientOnly>

    <!-- modal แชร์แผน-->
    <div v-show="shareModalShow">
      <ModalPlanShare :modalClose="() => shareModalShow = false" :show="shareModalShow" />
    </div>

    <!-- modal เพิ่ม card ในแผน-->
    <div v-if="addCardModalShow">
      <ModalPlanAdd :modalClose="() => addCardModalShow = false" :show="addCardModalShow" :TimeStamp="TimeStampAdd" @addCard="addCardToPlan" />
    </div>

    <!-- modal ข้อมูลขอแต่ล่ะ card-->
    <div v-if="cardModalShow && cardData != null">
    <ModalPlanCard :modalClose="() => cardModalShow = false" :show="cardModalShow" :Data="cardData" />
    </div>

    <!-- modal เพิ่มวันที่-->
    <div v-if="DateModalShow">
      <ModalPlanDatePick :modalClose="() => DateModalShow = false" :show="DateModalShow" @addDate="addDate" />
    </div>
  </ClientOnly>
</template> 

<style>
body {
  background-color: #f0f0f0;
  font-family: 'Kanit', sans-serif;
}
</style>
