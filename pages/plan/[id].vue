<script setup>


definePageMeta({
  layout: 'defaultmain',
})

//สำหรับเงื่อนไขการแสดง modal
const shareModalShow = ref(false);

const DateModalShow = ref(false);

const dataTest = ref([
  {
    id: 1,
    title: "hello1",
    description: "test",
    image: "/numpoo.jpg",
    view: 9000,
    review_point: 4.2,
    start_time: "09:20",
    end_time: "16:20",
    owner_name: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 2,
    title: "hello2",
    description: "test",
    image: "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/9/1663238988_1663238987903.jpeg",
    view: 10020,
    review_point: 4.3,
    start_time: "10:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 3,
    title: "hello3",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10030,
    review_point: 4.1,
    start_time: "10:40",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 4,
    title: "hello4",
    description: "test",
    image: "/numpoo.jpg",
    view: 10050,
    review_point: 4.5,
    start_time: "11:00",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 5,
    title: "hello5",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10060,
    review_point: 4.6,
    start_time: "07:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
])


const dataTest2 = ref([
  {
    id: 1,
    title: "hello1",
    description: "test",
    image: "/numpoo.jpg",
    view: 9000,
    review_point: 4.5,
    start_time: "09:20",
    end_time: "16:20",
    owner_name: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 2,
    title: "hello2",
    description: "test",
    image: "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/9/1663238988_1663238987903.jpeg",
    view: 10020,
    review_point: 4.5,
    start_time: "10:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 3,
    title: "hello3",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10030,
    review_point: 4.5,
    start_time: "10:40",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 4,
    title: "hello4",
    description: "test",
    image: "/numpoo.jpg",
    view: 10040,
    review_point: 4.5,
    start_time: "11:00",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 5,
    title: "hello5",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10030,
    review_point: 4.5,
    start_time: "7:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
])

const dataTest3 = ref([
  {
    id: 1,
    title: "hello1",
    description: "test",
    image: "/numpoo.jpg",
    view: 9000,
    review_point: 4.5,
    start_time: "09:00",
    end_time: "16:20",
    owner_name: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 2,
    title: "hello2",
    description: "test",
    image: "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/9/1663238988_1663238987903.jpeg",
    view: 10020,
    review_point: 4.5,
    start_time: "10:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 3,
    title: "hello3",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10030,
    review_point: 4.5,
    start_time: "10:40",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 4,
    title: "hello4",
    description: "test",
    image: "/numpoo.jpg",
    view: 10040,
    review_point: 4.5,
    start_time: "11:00",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
  {
    id: 5,
    title: "hello5",
    description: "test",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
    view: 10030,
    review_point: 4.5,
    start_time: "11:20",
    end_time: "16:20",
    owner: "numpoo",
    owner_lastname: "poo",
    owner_image: "numpoo.jpg"
  },
])
</script>

<template>
  <div class="bg-gray-100 h-fit">
    <!-- header -->
    <div class="flex justify-between px-6 2xl:px-6 mt-12 h-auto">
      <h1 class="text-3xl font-bold">แผนการ</h1>
      <div class="flex items-center ">
        <div class="mr-6 flex -space-x-5 h-fit">
          <div class="h-16 w-16 rounded-full bg-gray-500"></div>
          <div class="h-16 w-16 rounded-full bg-red-500"></div>
          <div class="h-16 w-16 rounded-full bg-blue-500"></div>
        </div>
        <button @click="() => shareModalShow = true" class="flex items-center justify-center text-white shadow-inner bg-[#0000005c] shadow-black/50 w-[8dvw] h-12 p-2 text-lg font-extrabold rounded-md ">
          <i class="fa-solid fa-user-plus"></i>
          Share
        </button>
      </div>

    </div>

    <!-- รายการแผน -->
    <PlanList title="12/12/2024" :ListPlan="dataTest" />
    <PlanList title="13/12/2024" :ListPlan="dataTest2" />
    <PlanList title="14/12/2024" :ListPlan="dataTest3" />

    <div class=" flex flex-col text-center w-fit mx-auto my-12">
      <button @click="() => DateModalShow = true" class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md shadow-black/30 w-[40dvw] mb-6 text-2xl">
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
    <div v-show="shareModalShow">
      <ModalPlanShare :modalClose="() => shareModalShow = false" :show="shareModalShow" />
    </div>
    <div v-show="DateModalShow">
      <ModalPlanDatePick :modalClose="() => DateModalShow = false" :show="DateModalShow" />
    </div>
  </ClientOnly>
</template> 

<style>
body {
  background-color: #f0f0f0;
  font-family: 'Kanit', sans-serif;
}
</style>
