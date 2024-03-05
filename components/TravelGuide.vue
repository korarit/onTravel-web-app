<style>
@import url("~/assets/css/template.css");

.carousel__slide {
    min-height: 100%;
    height: 100%;
}
.carousel__item {
    height: 200px;
    max-height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<script setup lang="ts">
type Itemdata = {
    image: string[],
    title: string,
    description: string
}

const TravelGuideTest = ref<Array<Itemdata>>([
    {
        image: [
            "https://s.isanook.com/tr/0/ud/283/1417415/ahr0chm6ly9zlmlzyw5vb2suy29tl_9.jpg?ip/resize/w728/q80/jpg",
            "https://researchcafe.tsri.or.th/wp-content/uploads/2020/03/4-3.jpg",
            "https://s7ap1.scene7.com/is/image/bot/krabi-thailand-tourism?ts=1684474676456&dpr=off"
        ],
        title: "11 ร้านอาหาร คาเฟ่อัมพวา แม่กลอง สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อย หลายสไตล์",
        description: "ใครมาเที่ยว อัมพวา-แม่กลอง จ.สมุทรสาคร เตรียมปักหมุดความอร่อยไว้เลย วันนี้ทริปเก็ทเตอร์จะพาทุกคนไปกินครบคาวหวานกับ11 ร้านอาหาร - คาเฟ่อัมพวา สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อยหลายสไตล์ บอกเลยว่าแต่ละร้านอยู่ติดริมน้ำ แถมใกล้ที่เที่ยวดังๆ มากมาย ส่วนอาหารก็มีทั้งซีฟู้ดฉ่ำๆ อาหารไทยสูตรต้นฉบับรวมถึงมีคาเฟ่สุดชิลล์ที่ห้ามพลาด เอาเป็นว่ารีบมาตามกันเลยดีกว่า",
    },
    {
        image: [
            "https://s.isanook.com/tr/0/ud/283/1417415/ahr0chm6ly9zlmlzyw5vb2suy29tl_9.jpg?ip/resize/w728/q80/jpg",
            "https://researchcafe.tsri.or.th/wp-content/uploads/2020/03/4-3.jpg",
            "https://s7ap1.scene7.com/is/image/bot/krabi-thailand-tourism?ts=1684474676456&dpr=off"
        ],
        title: "12 ร้านอาหาร คาเฟ่อัมพวา แม่กลอง สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อย หลายสไตล์",
        description: "ใครมาเที่ยว อัมพวา-แม่กลอง จ.สมุทรสาคร เตรียมปักหมุดความอร่อยไว้เลย วันนี้ทริปเก็ทเตอร์จะพาทุกคนไปกินครบคาวหวานกับ11 ร้านอาหาร - คาเฟ่อัมพวา สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อยหลายสไตล์ บอกเลยว่าแต่ละร้านอยู่ติดริมน้ำ แถมใกล้ที่เที่ยวดังๆ มากมาย ส่วนอาหารก็มีทั้งซีฟู้ดฉ่ำๆ อาหารไทยสูตรต้นฉบับรวมถึงมีคาเฟ่สุดชิลล์ที่ห้ามพลาด เอาเป็นว่ารีบมาตามกันเลยดีกว่า",
    },
    {
        image: [
            "https://s.isanook.com/tr/0/ud/283/1417415/ahr0chm6ly9zlmlzyw5vb2suy29tl_9.jpg?ip/resize/w728/q80/jpg",
            "https://researchcafe.tsri.or.th/wp-content/uploads/2020/03/4-3.jpg",
            "https://s7ap1.scene7.com/is/image/bot/krabi-thailand-tourism?ts=1684474676456&dpr=off"
        ],
        title: "13 ร้านอาหาร คาเฟ่อัมพวา แม่กลอง สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อย หลายสไตล์",
        description: "ใครมาเที่ยว อัมพวา-แม่กลอง จ.สมุทรสาคร เตรียมปักหมุดความอร่อยไว้เลย วันนี้ทริปเก็ทเตอร์จะพาทุกคนไปกินครบคาวหวานกับ11 ร้านอาหาร - คาเฟ่อัมพวา สมุทรสงคราม พิกัดเด็ดริมน้ำ อิ่มอร่อยหลายสไตล์ บอกเลยว่าแต่ละร้านอยู่ติดริมน้ำ แถมใกล้ที่เที่ยวดังๆ มากมาย ส่วนอาหารก็มีทั้งซีฟู้ดฉ่ำๆ อาหารไทยสูตรต้นฉบับรวมถึงมีคาเฟ่สุดชิลล์ที่ห้ามพลาด เอาเป็นว่ารีบมาตามกันเลยดีกว่า",
    }
])
const keyData = ref(0)
const ListTravelGuideTest:any = TravelGuideTest
function LoopShow() {         
  setTimeout(function() {   
    if(keyData.value == ListTravelGuideTest.length){
        keyData.value = 0
    }else{
        keyData.value++
    }
    LoopShow();             
  }, 20000)
}
LoopShow();
function changeShow(index: number){
    keyData.value = index
}

</script>
<template>
    <ClientOnly>
        <div class=" max-h-[100%] min-h-[500px] pt-8 flex justify-between">
            <div class="w-[45%] h-[100%] rounded-xl">
                <Carousel :autoplay="5000" :pauseAutoplayOnHover="true" :wrapAround="false" style="height: 100%;" class="rounded-xl">
                    <Slide v-for="slide in TravelGuideTest[keyData]?.image  " :key="slide" style="max-height: 100%;" class="rounded-xl">
                        <img :src="slide" style="min-height: 500px;height: 100%;" class="rounded-xl object-cover">
                    </Slide>
                </Carousel>
            </div>
            <div class="w-[52%] min-h-[100%] flex flex-col">
                <p class="text-[1.7rem] font-semibold">{{ TravelGuideTest[keyData]?.title }}</p>

                <div class="w-[100%] h-[6px] relative flex my-6">
                    <div class="absolute w-[30%] h-[6px] bg-[#F9A825] z-10 "></div>
                    <div class="self-end w-[100%] h-[2px] bg-[#F9A825] z-0"></div>
                </div>

                <p class="text-[1.3rem] font-normal text-justify line-clamp">{{ TravelGuideTest[keyData]?.description }}</p>
            
                <button class="my-8 flex h-[28px] w-fit items-center space-x-4">
                    <p class="text-[28px] my-8 font-bold leading-6">อ่านต่อ</p>
                    <font-awesome-icon class="text-[28px] h-[20px]" :icon="['fas', 'arrow-right']" />
                </button>
                <div class="w-[100%] my-auto flex justify-center space-x-4">
                    <button v-for="id in TravelGuideTest.length" 
                        v-bind:class="(id-1 == keyData)?'bg-[#F9A825] h-[16px] w-[16px] rounded-full' : 'bg-[#fbd18d] h-[16px] w-[16px] rounded-full'"
                        @click="changeShow(id-1)"
                        :key="id-1"
                        :aria-label="`click to select ${id-1}`"
                    ></button>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>