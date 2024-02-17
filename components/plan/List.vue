<script setup lang="ts">


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
}

const props = defineProps<{
    title: string;
    ListPlan: PlanCardType[]
}>();
/////////////////// data ///////////////////
const defult_list = ref<any>()
const list = ref<any>([])

const free_sort = ref<boolean>(false)

onMounted(() => {
    list.value = props.ListPlan
    defult_list.value = props.ListPlan.slice()
})

function sortData(event:any){
    if(event.target.value === "view_sorted"){
      free_sort.value = true
      list.value.sort((a: any, b: any) => (b.view - a.view))
    }if(event.target.value === "review_sorted"){
      free_sort.value = true
      list.value.sort((a: any, b: any) => (b.review_point - a.review_point))
    }if(event.target.value === "start_sorted"){
      free_sort.value = true
      list.value.sort((a: any, b: any) => {
        let aTime = a.start_time.split(":");
        let bTime = b.start_time.split(":");
        return Number((aTime)[0]) * 60 + Number(aTime[1]) - ( Number(bTime[0]) * 60 + Number(bTime[1]) );
      })
    }if(event.target.value === "free"){
      free_sort.value = false
      list.value = defult_list.value.slice()
    }
}

/////////////////// drag scroll ///////////////////
const isdrap = ref<boolean>(false)
const startDrag = ref<number>(0)
const scrollLeft = ref<number>(0)
const elementRange = ref<HTMLElement | null>(null)


function RangeMouseDown(event: MouseEvent) {
    console.log(event.pageX)
    isdrap.value = true
    if (elementRange.value) {
      startDrag.value = (event.pageX - elementRange.value.offsetLeft);
      scrollLeft.value = (elementRange.value.scrollLeft);
    }
}
function RangeMouseLeave(event: MouseEvent) {
  isdrap.value = false
}
function RangeMouseMove(event: MouseEvent) {
  console.log(event.pageX)
  if (isdrap.value && elementRange.value !== null) {
    event.preventDefault();
    const x: number = event.pageX - elementRange.value.offsetLeft;
    const walk: number = (x - startDrag.value) * 1; //scroll-fast
    elementRange.value.scrollLeft = scrollLeft.value - walk;
  }
}


</script>

<template>
    <!-- Search bar -->
    <div class="flex items-center my-10">
      <h1
        class="text-2xl font-medium flex items-center justify-center w-[24dvw] h-[56px] rounded-r-md bg-[#F9A825] text-black shadow-gray-500 shadow-inner focus:outline-none"
      >
        แผนวันที่ {{ title }}
      </h1>

      <div class="ml-8 h-fit w-fit rounded-md bg-[#ADADAD]">
        <select  v-on:change="sortData($event)" class=" h-[56px] w-auto bg-[#ADADAD] select-transalte rounded-md shadow-inner shadow-gray-500 flex space-x-6 items-center px-6 text-2xl font-medium">
          <option class="text-black" value="free">เรียงอิสระ</option>
          <option value="view_sorted">เรียงตามจำนวนวิว</option>
          <option value="review_sorted">เรียงตามคะแนนรีวิว</option>
          <option value="start_sorted">เรียงตามเวลาเริ่มต้น</option>
        </select>
      </div>


      <div class="flex space-x-2 ml-auto mr-7">
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
      </div>

    </div>
    <div>
      <!-- Travel list section 1 -->
      <div class="">
        <div class="h-auto">
          <draggable
            :list="list"
            class="overflow-auto max-w-[100dvw] h-fit flex flex-nowrap text-nowrap bg-white py-4"
            direction="horizontal"
            :disabled="free_sort"
            draggable=".item"
          >

            <div class="item first:lg:ml-0 first:lg:mr-4 mx-4  first:2xl:ml-0 first:2xl:mr-4  2xl:last:mr-0" v-for="(cardData, index) in list" :key="index">
              <PlanCard  :CardData="cardData" />
            </div>

            <PlanAddCard v-for="i in (list.length <= 4 ? 4 - list.length : 0)" :key="i" />

            <PlanAddCard v-if="list.length > 4" />
            
          </draggable>
        </div>
      </div>
    </div>
</template>
<style scoped>
@import url('~/assets/css/template.css');
</style>