<script setup lang="ts">

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

<template>
    <input id="file_input" multiple accept="image/*" type="file" hidden @change="uploadFile">
    <div class="bg-white rounded-t-lg px-4 border-black border-x-2 border-t-2 w-full py-2 flex items-center">
        <p for="upload" class="text-[24px] font-bold text-[#01579B]">อัพโหลดรูปภาพ</p>
        <label for="file_input"
            class="ml-auto bg-[#F9A825] hover:bg-yellow-600 py-2 px-10 rounded-md text-white text-lg font-semibold cursor-pointer">
            Upload File
        </label>
    </div>

    <div :class="`w-full ${dropfile_enter === true ? 'bg-gray-100' : 'bg-white'}  rounded-b-lg items-center justify-center flex flex-col border-x-2 border-b-2 border-gray-950 shadow-inner shadow-black/30 min-h-[248px]`"
        @drop.prevent="dropFile" @dragover="dropfile_enter = true"
        @dragleave="setTimeout(() => { dropfile_enter = false }, 50)">
        <div class="h-[200px] w-full flex items-center justify-center" v-if="image_url_list.length === 0">
            <div class="flex flex-col" v-if="dropfile_enter === false">
                <div id="show" style="background-image: url('https://img2.pic.in.th/pic/Vectorupload.png');"
                    class="w-[100px] h-[70px] bg-center bg-contain bg-no-repeat mx-auto select-none">
                </div>
                <div class="mx-auto text-[28px] text-[#A8A7A7] mt-2 select-none">Drop File Image Here</div>
            </div>
            <p v-if="dropfile_enter === true" class="text-[36px] text-[#F9A825] select-none">Drop File To Here</p>
        </div>
        <div v-if="image_url_list.length > 0" class="relative h-fit w-full">

            <div
                :class="`h-full w-full ${dropfile_enter ? 'flex' : 'hidden'} items-center justify-center absolute z-[100] bg-[#00000078]`">
                <p class="text-2xl text-white font-semibold">Drop File To Here</p>
            </div>

            <div class="w-full grid grid-cols-4 gap-6 p-6">
                <div class="relative rounded-md shadow-md shadow-black/30 w-full h-[200px]"
                    v-for="(image, index) in image_url_list" :key="index">
                    <button @click="removeImage(index)"
                        class="absolute z-10 -top-4 -right-2 bg-red-600 rounded-lg h-8 w-8 flex justify-center items-center">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="text-[30px] text-white" />
                    </button>
                    <div class="absolute overflow-hidden rounded-md bg-contain bg-center bg-no-repeat bg-black w-full h-full"
                        :style="`background-image: url('${image}')`">
                        <!-- <img :src="image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  object-scale-down h-full "> -->
                    </div>
                </div>
            </div>

        </div>

</div></template>