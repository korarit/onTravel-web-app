<script setup lang="ts">
const props = defineProps({
    modalClose: Function,
    show: Boolean
});

////////////////// แปลภาษา //////////////////////
const language = ref(await inject('language'))


const showTrasition = ref(false)

watch(() => props.show, (value:boolean) => {
    if(value){
        showTrasition.value = true
    }
})
function ModalClose() {
    showTrasition.value = false
    setTimeout(() => {
        props.modalClose()
        
        nextTick(() => {
        date.value = null
        document.getElementById('button-add-time')?.setAttribute('disabled', 'true')
        });
    }, 320);

}
const attributes = ref([
  {
    highlight: 'hight-light',
    
    // Wrap lone date range in separate array to avoid rendering as multiple dates
    dates: [[new Date(2024, 1, 17), new Date(2024, 1, 19)]],
  }
]);



const date = ref(null)
const resetting = ref(false);


watch(() => date.value, (value:any) => {
    if (resetting.value) {
        resetting.value = false;
        return;
    }

    let startDate = new Date(2024, 1, 17)
    let endDate = new Date(2024, 1, 19)
    let select_time = new Date(value)
    if (select_time >= startDate && select_time <= endDate){
        console.log('in range')
    }else{
        console.log('out of range')
        resetting.value = true;
        nextTick(() => {
            date.value = null
        });
    }
})
const selectDragAttribute = computed(() => ({
  popover: {
    visibility: 'hover',
    isInteractive: false,
  },
}));
</script>
<style>
@import url("~/assets/css/modal.css");

.vc-hight-light {
    --vc-accent-100: #ffd99c;
    --vc-accent-200: #ffdfac;
    --vc-accent-600: #f4a018;

}
.vc-sky-blue {
    --vc-accent-600: #20a751;



    --vc-text-2xs: 30px;
    --vc-text-xs: 18px;
    --vc-text-sm: 20px;
    --vc-text-base: 24px;
    --vc-text-lg: 24px;
    --vc-text-xl: 20px;
    --vc-text-2xl: 30px;

}


</style>
<template>
    <div class="modal-overlay items-center">
        <Transition name="modal">
        <div v-show="showTrasition" class="borderd-2 h-fit w-[70dvw] lg:w-[50dvw] 2xl:w-[700px] bg-[#fdfdfd] rounded-xl shadow-md p-10">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold leading-7">เลือกวันที่เพื่อเพิ่มในแผน</h1>

                <button class="h-[30px] flex items-center" @click="ModalClose()">
                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-[42px] font-bold h-[36px]" />
                </button>
            </div>

            <div class="mx-auto w-[100%] h-fit flex bg-[#f7f7f7] my-4 justify-center shadow-inner rounded-md shadow-black/30">
                <VDatePicker locale="th" color="sky-blue" dot-bg="" v-model="date" :select-attribute="selectDragAttribute" :min-date="new Date(2024, 1 , 1)" :max-date="new Date(2024, 1 , 29)" :attributes="attributes" :allowed-dates="allowedDates" expanded transparent borderless />
            </div>

            <button v-if="date !== null" id="button-add-time" @click="ModalClose()" class="w-full h-[50px] text-[20px] font-semibold text-white bg-green-500   rounded-md">
                เพิ่มวันที่ {{ date !== null ? new Date(date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
            </button>
            <button v-else id="button-add-time" @click="ModalClose()" class="w-full h-[50px] text-[20px] font-semibold text-white bg-green-600   rounded-md">
                เพิ่มวันที่ 
            </button>

        </div>
        </Transition>
    </div>
</template>
