<script setup lang="ts">
const props = defineProps({
    modalClose: Function,
    show: Boolean
});

////////////////// แปลภาษา //////////////////////
const language = ref<any>(await inject('language'))


const showTrasition = ref<boolean>(false)

watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })

function ModalClose() {
    showTrasition.value = false
    setTimeout(() => {
        if (props.modalClose) {
            props.modalClose();
        }
    }, 320);
}

//url จาก config
const config = useRuntimeConfig()
//ดึง url ของหน้าเว็บ
const route = useRoute()
console.log(config.public.WEB_URL)
const url = ref(config.public.WEB_URL+route.path)

function Copy(){
    navigator.clipboard.writeText(config.public.WEB_URL+route.path)
}


</script>
<style scoped>
@import url("~/assets/css/modal.css");
</style>
<template>
    <div class="modal-overlay items-center">
        <Transition name="modal">
        <div v-show="showTrasition" class="borderd-2 h-fit w-[70dvw] lg:w-[50dvw] 2xl:w-[700px] bg-[#fdfdfd] rounded-xl shadow-md p-10">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-semibold leading-7">แชร์"แผนท่องเที่ยว-1"</h1>

                <button @click="ModalClose()">
                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-[42px] font-bold h-[36px]" />
                </button>
            </div>

            <div class="mx-auto w-[100%] h-[5dvh] flex  my-4 justify-center">
                <input class="h-full w-full bg-[#e6e6e6] placeholder:text-[#909090] rounded-md  shadow-gray-400 shadow-inner pl-4 text-[20px]" type="text" placeholder="เพิ่มคนเข้าแผน ด้วย Username / Email / เบอร์โทรศัพท์">
            </div>

            <div>
                <h1 class="text-2xl font-semibold">บุคคนที่มีสิทธิ์เข้าถึง</h1>
            </div>
            <div class="my-4 w-full max-h-[35dvh] overflow-y-auto flex flex-col space-y-4">
                <div class="flex items-center  justify-between">
                    <div class="flex items-center">
                        <div class="bg-gray-400 shadow-md rounded-full h-[56px] w-[56px]"></div>
                        <div class="ml-4">
                            <h1 class="font-bold">นายเอ นอนน้อยโคตร</h1>
                            <p class="mt-[-0.5dvh]">abcx@gmail.comm | 090-xxx-xxxx</p>
                        </div>

                    </div>
                    <p class="font-semibold text-[18px]">เจ้าของ</p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="bg-gray-400 shadow-md rounded-full h-[56px] w-[56px]"></div>
                        <div class="ml-4">
                            <h1 class="font-bold">นายบี นอนน้อยโคตร</h1>
                            <p class="mt-[-0.5dvh]">abcx@gmail.comm | 090-xxx-xxxx</p>
                        </div>

                    </div>
                    <div class="ml-[8dvw]">

                        <select class="border-none rounded-lg select-none bg-opacity-50 font-semibold text-[18px] " name="ผู้ร่วมแผน" id="cars">
                            <option value="volvo">ผู้ร่วมแผน</option>
                            <option value="saab">ผู้เข้าชม</option>
                        </select>
                    </div>

                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="bg-gray-400 shadow-md rounded-full h-[56px] w-[56px]"></div>
                        <div class="ml-4">
                            <h1 class="font-bold">นายบี นอนน้อยโคตร</h1>
                            <p class="mt-[-0.5dvh]">abcx@gmail.comm | 090-xxx-xxxx</p>
                        </div>

                    </div>
                    <div class="ml-[8dvw]">

                        <select class="border-none rounded-lg select-none bg-opacity-50 font-semibold text-[18px] " name="ผู้ร่วมแผน" id="cars">
                            <option value="volvo">ผู้ร่วมแผน</option>
                            <option value="saab">ผู้เข้าชม</option>
                        </select>
                    </div>

                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="bg-gray-400 shadow-md rounded-full h-[56px] w-[56px]"></div>
                        <div class="ml-4">
                            <h1 class="font-bold">นายบี นอนน้อยโคตร</h1>
                            <p class="mt-[-0.5dvh]">abcx@gmail.comm | 090-xxx-xxxx</p>
                        </div>

                    </div>
                    <div class="">

                        <select class="border-none rounded-lg select-none bg-opacity-50 font-semibold text-[18px] " name="ผู้ร่วมแผน" id="cars">
                            <option value="volvo">ผู้ร่วมแผน</option>
                            <option value="saab">ผู้เข้าชม</option>
                        </select>
                    </div>

                </div>

            </div>

            <h1 class="mb-4 text-xl font-bold">การเข้าทั่วไป</h1>

            <div class="w-full flex items-center justify-between">
                <div class="flex ">
                    <div class="bg-gray-400 shadow-md rounded-full h-[56px] w-[56px]"></div>
                    <div class="ml-4">
                        <div>
                            <select class="border-none rounded-lg select-none bg-opacity-50 font-semibold text-[18px] " name="ผู้ร่วมแผน" id="cars">
                                <option value="volvo">ทุกคนทีมีลิงก์</option>
                                <option value="saab">ผู้เข้าชม</option>
                            </select>
                        </div>

                        <p class="mt-[-0.5dvh]">ผู้ใช้อินเทอร์เน็ตทุกคนที่มีลิงก์นี้จะดูได้</p>
                    </div>

                </div>
                <div class="">
                    <select class="border-none rounded-lg select-none bg-opacity-50 font-semibold text-[18px]" name="ผู้ร่วมแผน" id="cars">
                        <option value="volvo">ผู้ร่วมแผน</option>
                        <option value="saab">ผู้เข้าชม</option>
                    </select>
                </div>

            </div>

            <div class="w-full flex items-center justify-between mt-8">
                <button @click="Copy()" class="border-2 w-[16dvw] xl:w-[13dvw] h-[4dvw] xl:h-[3.5dvw]  2xl:h-[3.5dvw] shadow-md border-[#F9A825] hover:bg-[#f4f4f4] items-center bg-opacity-100 flex rounded-xl">
                    <div class="flex items-center justify-center mx-auto">
                        <div class="mr-2">
                            <font-awesome-icon :icon="['fas', 'link']" class="text-[24px] h-[10px] text-[#349AE4]" />
                        </div>
                        <h1 class="font-medium text-[20px] text-[#349AE4] leading-3">คัดลอกลิ้งค์</h1>
                    </div>
                </button>

                <button @click="ModalClose">
                    <div class="border-2 w-[16dvw] xl:w-[13dvw] h-[4dvw] xl:h-[3.5dvw]  2xl:h-[3.5dvw]  border-black shadow-md  bg-[#F9A825] items-center bg-opacity-100 justify-center flex rounded-xl    ">
                        <h1 class="font-medium text-[20px] text-white">บันทึก</h1>
                    </div>
                </button>

            </div>
        </div>
        </Transition>
    </div>
</template>

