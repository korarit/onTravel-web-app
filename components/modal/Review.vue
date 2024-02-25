<script setup lang="ts">

const props = defineProps({
    modalClose: Function,
    show: Boolean
})

const showTrasition = ref<boolean>(false)
watch(() => props.show, () => {
    if (props.show){
        setTimeout(() => {
            showTrasition.value = true
        }, 20);
    }
},{ immediate: true })
function ModalClose(){
    showTrasition.value = false
    setTimeout(() => {
        if (props.modalClose){
            props.modalClose()
        }
    }, 340);
}

////////////////// แปลภาษา //////////////////////
const language = ref<any>(await inject('language'))



////////////////////////////// Image Upload //////////////////////////////
const dropfile_enter = ref<boolean>(false);
const image_url_list = ref<string[]>([]);

const event_drop = ['dragenter', 'dragover', 'dragleave', 'drop'];
onMounted(() => {
    event_drop.forEach((event) => {
        document.addEventListener(event, (e) => {
            e.preventDefault();
        });
    });
});
onUnmounted(() => {
    event_drop.forEach((event) => {
        document.removeEventListener(event, (e) => {
            e.preventDefault();
        });
    });
});

function dropFile(e: DragEvent) {
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt?.files;

    if (files) {
        for (var i = 0; i < files.length; ++i) {
        
            if (files[i].type.split('/')[0] !== 'image') {
                alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
                return;
            }

            image_url_list.value.push(URL.createObjectURL(files[i]));

        }
    }
    dropfile_enter.value = false;
}

function uploadFile(event: any) {
    var list_file = event.target.files;
    for (var i = 0; i < list_file.length; ++i) {
        
        if (list_file.item(i).type.split('/')[0] !== 'image') {
            alert('Please select image file');
            return;
        }

        image_url_list.value.push(URL.createObjectURL(list_file.item(i)));
    }

}

function removeImage(index: number) {
    image_url_list.value.splice(index, 1);
}

</script>
<style scoped>
@import url("~/assets/css/modal.css");

</style>
<template>
    <ClientOnly>
        <div class="modal-overlay items-center">
            <Transition name="modal">
            <div v-show="showTrasition" class="bg-[#fdfdfd] rounded-xl h-fit px-6 pb-6 w-[80dvw] lg:w-[50dvw] 2xl:w-[800px]">
                <!-- title -->
                <div class="modal-head h-fit w-full flex items-center mt-6">
                    <p class="flex items-center justify-center ml-[46%] text-[28px] font-semibold h-fit leading-[28px]">รีวิว</p>
                    <button @click="ModalClose()" class="flex items-center ml-[41%] justify-center w-[5%] h-[2dvw]">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[46px] font-bold cursor-pointer" />
                    </button>
                </div>

                <div class="w-full h-fit my-2">
                    <VoteStar />
                </div>
                <!-- text input -->
                <textarea class="w-full h-[15dvh] bg-[#F5F5F5] shadow-inner shadow-black/40 border-2 border-black rounded-xl p-4 placeholder:text-[20px] placeholder:text-[#7E7E7E] text-[20px] mb-4" 
                placeholder="เขียนรีวิวของคุณ"></textarea>

                <!-- image upload -->
                <input id="file_input" multiple accept="image/*" type="file" hidden @change="uploadFile">
                <div class="w-full py-2 px-4 flex items-center bg-[#FCFCFC] border-t-2 border-x-2 border-black rounded-t-xl">
                    <p class="text-[20px] font-semibold">อัพโหลดรูปภาพ</p>

                    <label for="file_input" class="flex items-center justify-center ml-auto w-[25%] h-[40px] rounded-xl bg-[#F9A825] border-2 border-black cursor-pointer">
                        <p class="text-[18px] text-white">อัพโหลด</p>
                    </label>
                </div>
                <div 
                    class="w-full h-fit border-b-2 border-x-2 border-black rounded-b-xl shadow-inner shadow-black/40 bg-[#F5F5F5] p-4"
                    @drop.prevent="dropFile" @dragover="dropfile_enter = true" @dragleave="setTimeout(() => { dropfile_enter = false }, 50)"
                >

                    <div class="flex justify-center items-center h-[12dvh]" v-if="image_url_list.length === 0">
                        <div class="flex flex-col space-y-1">

                            <div id="show" style="background-image: url('https://img2.pic.in.th/pic/Vectorupload.png');"
                                class="w-[90px] h-[70px] bg-center bg-contain bg-no-repeat mx-auto select-none">
                            </div>
                            <p class="text-[20px] font-medium select-none">Drop Image File In Here</p>
                        </div>
                    </div>

                    <div v-if="image_url_list.length > 0" class="relative h-fit w-full">

                        <div
                            :class="`h-full w-full ${dropfile_enter ? 'flex' : 'hidden'} items-center justify-center absolute z-[100] bg-[#00000078]`"
                        >
                            <p class="text-2xl text-white font-semibold">Drop File To Here</p>
                        </div>
                        <div class="w-full grid grid-cols-3 gap-4">
                            <div class="relative rounded-md shadow-md shadow-black/30 w-full h-[12dvh]"
                                v-for="(image, index) in image_url_list" :key="index">
                                <button @click="removeImage(index)"
                                    class="absolute z-10 -top-4 -right-2 bg-red-600 rounded-lg h-8 w-8 flex justify-center items-center">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-[24px] text-white" />
                                </button>
                                <div class="absolute overflow-hidden rounded-md bg-contain bg-center bg-no-repeat bg-black w-full h-full"
                                    :style="`background-image: url('${image}')`">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <!-- button -->
                <div class="flex items-center mt-6">
                    <button @click="ModalClose()" class="ml-auto w-[25%] h-[44px] bg-[#6F6F6F] rounded-xl border-2 border-black flex items-center justify-center">
                        <p class="text-[20px] text-white font-medium select-none">ยกเลิก</p>
                    </button>
                    <button @click="ModalClose()" class="ml-4 w-[25%] h-[44px] bg-[#F9A825] rounded-xl border-2 border-black flex items-center justify-center">
                        <p class="text-[20px] text-white font-medium select-none">รีวิว</p>
                    </button>

                </div>

            </div>
            </Transition>

        </div>
    </ClientOnly>
</template>