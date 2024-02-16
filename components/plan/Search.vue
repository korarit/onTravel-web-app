<template>
  <div class="flex justify-between px-6 2xl:px-6 mt-12 h-auto">
    <div class="flex items-center ">
      <div class="flex -space-x-5 mr-6 h-fit">
        <div class="h-16 w-16 rounded-full bg-gray-500"></div>
        <div class="h-16 w-16 rounded-full bg-red-500"></div>
        <div class="h-16 w-16 rounded-full bg-blue-500"></div>
      </div>
        <div
          class="flex items-center justify-center text-white shadow-inner bg-[#0000005c] shadow-black/50 w-[8dvw] h-12 p-2 text-lg font-extrabold rounded-md "
        >
        <i class="fa-solid fa-user-plus"></i>
          Share
        </div>
    </div>

    <div class="flex w-fit items-center ">
        <div class="relative space-x-reverse rounded-full h-12">
          <input
            type="search"
            placeholder="Search"
            class="w-[30dvw] h-full rounded-full bg-[#FDFDFD] text-black shadow-inner shadow-gray-400 focus:outline-none"
          />
          <button
            class="absolute right-0 h-full w-[8dvw] bg-black text-white rounded-full"
          >
            ค้นหา
          </button>
        </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Kanit", cursive;
}
</style>
