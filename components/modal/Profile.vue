<script setup lang="ts">

const props = defineProps({
    modalClose: Function,
    show: Boolean
});


</script>

<template>
    <div class="bg-white rounded-lg shadow-lg shadow-black/30 border-2 border-black w-fit h-fit px-4 py-3">
        <div class="flex w-full h-fit space-x-4">
            <div class="w-fit h-fit flex items-center">
                <div class="bg-cover bg-center rounded-full h-[120px] w-[120px]" style="background-image: url('/img/profile_test.jpg');"></div>
            </div>
            <div class="w-fit h-fit flex items-center justify-center">
                <div class="h-fit">
                    <p class="text-[24px] font-medium leading-7">Korarit Saengthong</p>

                    <div class="flex flex-col space-y-2 mt-3">
                        <NuxtLink @click="() => modalClose()" to="/auth/user" class="rounded-lg border-2 border-black px-2 hover:bg-green-600 hover:text-white">
                            <p class="text-[18px] font-medium">จัดการบัญชี</p>
                        </NuxtLink>
                        <NuxtLink @click="() => modalClose()" to="/auth/place-hotel/select-type" class="rounded-lg border-2 border-black px-2 hover:bg-gray-600 hover:text-white">
                            <p class="text-[18px] font-medium">สร้างบัญชีสถานที่ / ที่พัก</p>
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </div>
        <div class="mt-3">
            <button class="w-full py-1 border-2 border-red-600 rounded-lg bg-red-500">
                <p class="text-[18px] text-white text-center font-medium">ออกจากระบบ</p>
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal-enter-active {
    transition: all 0.3s ease-out;
}
  
  .modal-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
  
.modal-enter-from,
.modal-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
  </style>