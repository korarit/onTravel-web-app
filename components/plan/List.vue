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

    location: {
        lat: number;
        lon: number;
    }
}

const props = defineProps<{
    index: number;
    dateTimestamp: number;
    remove: Function;
    AddCard: Function;
    showData: Function;
    ListPlan: PlanCardType[];
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

/////////////////// setting list show ///////////////////
const setting_show = ref<boolean>(false)
function OpenSetting() {
    if (setting_show.value) {
      setting_show.value = false
    }else{
      setting_show.value = true
    }
}

//////////////////// remove plan ////////////////////
function removePlan(){
    props.remove()
    setTimeout(() => {
      setting_show.value = false
    }, 100);
}


</script>

<template>
    <!-- Search bar -->
    <div class="relative h-[110px] w-full">
      <div class="absolute top-1/2 -translate-y-1/2 flex items-center">
        <h1
        class="text-2xl font-medium flex items-center justify-center w-[24dvw] h-[56px] rounded-r-md bg-[#F9A825] text-black shadow-gray-500 shadow-inner focus:outline-none"
      >
          แผนวันที่ {{ ("0" + new Date(dateTimestamp).getDate()).slice(-2) }} / {{ ("0" + (new Date(dateTimestamp).getMonth() + 1)).slice(-2) }} / {{ new Date(dateTimestamp).getFullYear() }}
        </h1>

        <div class="ml-8 h-fit w-fit rounded-md bg-[#ADADAD]">
          <select  v-on:change="sortData($event)" class=" h-[56px] w-auto bg-[#ADADAD] select-transalte rounded-md shadow-inner shadow-gray-500 flex space-x-6 items-center px-6 text-2xl font-medium">
            <option class="text-black" value="free">เรียงอิสระ</option>
            <option value="view_sorted">เรียงตามจำนวนวิว</option>
            <option value="review_sorted">เรียงตามคะแนนรีวิว</option>
            <option value="start_sorted">เรียงตามเวลาเริ่มต้น</option>
          </select>
        </div>

      </div>


      <button @click="OpenSetting()" class="absolute top-1/2 -translate-y-1/2 flex space-x-2  right-7">
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
        <div class="h-[1dvw] w-[1dvw] 2xl:h-[0.7dvw] 2xl:w-[0.7dvw] rounded-full bg-[#a9a9a9]"></div>
      </button>

      <Transition name="modal">
      <div v-show="setting_show" class=" h-fit w-[120px] absolute -bottom-3 right-7 z-[100]">
        <div class="bg-white rounded-lg border-2 border-black flex flex-col">
          <button @click="() => removePlan()" class="w-full text-[24px] font-medium hover:bg-red-600 hover:text-white">
          ลบ
          </button>
        </div>
      </div>
      </Transition>

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

            <div  class="item first:lg:ml-4 first:lg:mr-4 mx-4  first:2xl:ml-4 first:2xl:mr-4  2xl:last:mr-0" v-for="(cardData, index) in list" :key="index">
              <PlanCard  :CardData="cardData" :ModalData="showData" />
            </div>

            <PlanAddCard @click="AddCard(index, dateTimestamp)" v-for="i in (list.length <= 4 ? 5 - list.length : 0)" :key="i" />

            <PlanAddCard @click="AddCard(index, dateTimestamp)" v-if="list.length > 4" />
            
          </draggable>
        </div>
      </div>
    </div>
</template>
<style scoped>
@import url('~/assets/css/template.css');

.modal-enter-active {
    transition: all 0.3s ease-out;
}
  
  .modal-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
  
.modal-enter-from,
.modal-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>