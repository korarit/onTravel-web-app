<template>

  <div class="mb-4 px-12 2xl:px-24 max-w-[100dvw] h-fit">
    <ImgaeGallary :ImageList="data.image" />
  </div>

  <div class="bg-[#F9A825] w-full h-1"></div>

  <div class="px-12 2xl:px-24 max-w-[100dvw] h-fit my-4">
    <div class="w-full flex items-center justify-between">

      <div class="h-fit w-fit">
        <p class="text-[2.5dvh] font-semibold justify-start">#Place</p>
      </div>

      <div class="w-[33%] h-[48px] bg-[#FBC02D] rounded-3xl flex">

        <div class="w-[10%] flex items-center">
            <font-awesome-icon 
                class="text-black h-[20px] mx-auto my-auto text-[1.4rem]"
                :icon="['fas', 'search']" 
            />
        </div>

        <input
            class="w-[70%] h-[48px] placeholder-black text-black text-[1.2rem] bg-transparent font-medium focus:outline-none"
            type="text" placeholder="ค้นหา" v-model="keyword_seacrh" @keyup.enter="GoSearch()" 
        />

        <button @click="GoSearch()" class="w-[20%] h-[48px] bg-black rounded-3xl flex justify-center items-center">
            <p class="text-[1.2rem] font-semibold text-white">ค้นหา</p>
        </button>
      </div>
    </div>
  </div>


  <div class="px-12 2xl:px-24 max-w-[100dvw] min-h-[62dvh] flex gap-5 mb-7">
    <div class="flex flex-col space-y-4 min-h-full max-h-[100%] w-[67%]">
      <div class="border-black bg-[#FDFDFD] border-2 rounded-xl  h-[100%] p-6 flex flex-col">

        <div class="flex justify-between mb-2">
          <div class="flex flex-col">
            <p class="text-[3dvh] font-semibold">{{ data.name }}</p>
            <Star :Point="data.point_review"  />
          </div>
          <button class="flex flex-col justify-center text-center" @click="() => sharingModalShow = true">
            <div class="flex w-full justify-center">
              <font-awesome-icon :icon="['fas', 'share-nodes']" class="text-[4dvh] text-center" />
            </div>
            <p class="text-[2.5dvh] font-medium">แชร์</p>
          </button>
        </div>

        <div class="min-h-0 overflow-auto">
          {{ data.descirtion }}
        </div>
      </div>

    </div>
    
    <div class="flex flex-col min-h-full w-[33%]">
      <div class="border-black bg-[#FDFDFD] border-2 rounded-xl h-[40%] p-6 grid grid-cols-1 place-content-center">
        <p class="text-[24px] font-semibold">คะแนนรีวิว {{ data.point_review }}</p>
        <p class="text-[24px] font-semibold">จำนวนรีวิว {{ data.review_count }}</p>
        <p class="mt-6 text-[24px] font-semibold">จำนวนผู้เข้าชม {{ data.view_count }}</p>
      </div>

      <div class=" flex flex-col border-black bg-[#FDFDFD] border-2 rounded-xl min-h-[57%] mt-auto p-6">
        <div class="w-full h-[84%]  rounded-xl justify-items-center">
          <GoogleMap :location="[data.location.lat, data.location.lon]" :zoomLevel="16" />
        </div>
        <div class="flex justify-between items-center mt-4">
          <p class="text-[3dvh] font-semibold justify-start">
            สถานที่ตั้ง
          </p>
          <NuxtLink :to="`https://www.google.com/maps/@${data.location.lat},${data.location.lon}`" target="_blank" class="w-[10dvw] p-2 bg-black text-white rounded-lg text-[2.5dvh] text-center">
            นำทาง
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div class="px-12 2xl:px-24 max-w-[100dvw] h-fit my-8" v-if="data.contact.length !== 0">
    <div class="border-black bg-[#FDFDFD] border-2 rounded-xl w-full h-fit p-6">
      <p class="text-[3dvh] font-semibold">ช่องทางการติดต่อ</p>
      <div class="grid grid-cols-6 mt-3 gap-y-2">
        <NuxtLink :to="contact.url"  :key="contact" v-for="contact in data.contact" class="flex items-center justify-center">
          <font-awesome-icon :icon="['fab', contact.icon]" class="text-[36px]" />
          <p class="ml-4 font-semibold">{{ contact.name }}</p>
        </NuxtLink>

      </div>
    </div>
  </div>

  <div class="px-12 2xl:px-24 max-w-[100dvw] flex items-center">
    <p class="text-[30px] font-semibold">การรีวิว</p>
    <button v-if="status == 'authenticated'" @click="reviewModalShow = true" class="ml-auto w-[15%] h-[48px] rounded-md bg-[#F9A825] border-2 border-black">
      <p class="text-[20px] font-semibold text-white">รีวิวสถานที่</p>
    </button>
  </div>

  <div class="px-12 2xl:px-24 max-w-[100dvw] h-auto my-8" v-if="data.room !== 0">
    <div class=" grid grid-cols-1 gap-y-8 h-auto">
      <Review v-for="review in data.review" :key="review" :data="review"  />
    </div>
  </div>


  <div v-if="sharingModalShow">
    <ModalSharing :modalClose="() => sharingModalShow = false" :show="sharingModalShow" />
  </div>

  <div v-if="reviewModalShow" >
    <ModalReview :modalClose="() => reviewModalShow = false" :show="reviewModalShow" />
  </div>
</template>

<script setup>
const { status } = useAuth();

const data = ref({
  name : "Place 0001",
  descirtion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur neque, sunt iure minus cum, qui blanditiis fugit inventore nesciunt architecto numquam saepe assumenda nobis atque. Similique doloribus voluptate consequuntur eligendi.",
  point_review: 0.0,
  review_count: 0,
  view_count: 0,
  location: {
    lat: 19.02785403084483,
    lon: 99.89940151921624
  },
  service:{
    clean: true,
    food: true,
    checkin: true,
    transport: true,
  },
  facilities:['ที่จอดรถ','สระว่ายน้ำ','ฟิตเนส','สปา'],
  contact: [
    {icon: 'facebook',name: 'Facebook', url: 'https://www.facebook.com/'},
  ],
  review: [
    {
      id: 1, 
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id dolore aperiam sint excepturi voluptates fugit quod illum quisquam, impedit error delectus accusamus modi ab. Pariatur nihil ea doloremque officiis veritatis! adipisicing elit. Sed veritatis illo nemo ducimus animi necessitatibus. Velit provident autem a distinctio eaque quia porro reiciendis tempora, sunt, magnam modi perspiciatis quas.',
      point : 4.5,
      image: ['https://baanphuwaan.org/wp-content/uploads/2022/08/BW-0078.jpg','https://www.style-stay.com/wp-content/uploads/2021/09/225125680-800x534.jpg','https://www.grandecentrepointpattaya.com/upload/rooms-and-suites/2-rooms-and-suites.jpg?v=66']
    }
  ],
  image:[
    'https://www.grandecentrepointpattaya.com/upload/rooms-and-suites/2-rooms-and-suites.jpg?v=66',
    'https://landmark-mekong-riverside-hotel-vientiane.hotelmix.co.th/data/Photos/OriginalPhoto/7074/707477/707477569/Landmark-Mekong-Riverside-Hotel-Vientiane-Exterior.JPEG',
    'https://www.grandecentrepointpattaya.com/upload/rooms-and-suites/1-rooms-and-suites.jpg?v=66',
    'https://baanphuwaan.org/wp-content/uploads/2022/08/BW-0078.jpg',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/233317766.jpg?k=01bf8b2b413f800c6fbab620d06223c1c60357e4ef437f6fb2f9812c6bb626f3&o=',
    'https://riverineplace.com/wp-content/uploads/2023/12/types-hotel-rooms.jpg',
    'https://www.prachachat.net/wp-content/uploads/2023/01/16-2-%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1-728x485.jpg',
    'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//hotelier-images/42/fe/57ad825ce2c6e84292518ceb877adfd49bbb49be786e58035cb4cd33e738.jpeg',
    'https://www.style-stay.com/wp-content/uploads/2021/09/225125680-800x534.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/332710360.jpg?k=1358c2d77fb76b01039223e325e57b17aedad30235447a6a0d3e8a6f1d564ebb&o=&hp=1'
  ]
});
definePageMeta({
    layout: 'defaultmain',
    auth: false
});


//สำหรับเงื่อนไขการแสดง modal
const sharingModalShow = ref(false);

const reviewModalShow = ref(false);

</script>

<style scoped>
body {
  font-family: "Kanit", cursive;
  background-color: #D9D9D9;
}
</style>