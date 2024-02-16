<template>
    <div>
        <div class="container mx-auto px-4 py-4 lg:px-40 mt-10">
            <form class="flex flex-col gap-5">
                <div>
                    <label for="new" class="text-2xl font-bold text-[#01579B]">ชื่อสถานที่</label>
                    <input type="text" id='name'
                        class="mt-3 py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg "
                        placeholder="ชื่อสถานที่">
                </div>
                <div>
                    <label for="info" class="text-2xl font-bold text-[#01579B]">รายละเอียสถานที่</label>
                    <textarea id="info" rows="4" class="mt-3  block py-3 px-3 w-full  border-2 border-gray-950 rounded-lg "
                        placeholder="Write your thoughts here..."></textarea>
                </div>
                <div>
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">อัพโหลดรูปภาพ</label>
                    <label for="file_input">
                        <div
                        class="mt-3 w-full cursor-pointer  bg-white rounded-lg items-center justify-center flex flex-col border-2 border-gray-950 text-xl gap-2 h-auto py-10">
                        <img id="show" src="https://img2.pic.in.th/pic/Vectorupload.png" class="w-20" alt="">
                        <div class="text-[#A8A7A7]">DropFile Here</div>
                        <div class="text-[#A8A7A7]">Or</div>
                        <label for="file_input"
                            class="bg-[#F9A825] hover:bg-yellow-600 py-2 px-10 rounded-md text-white cursor-pointer">Select
                            Files
                        </label>
                        <input id="file_input" type="file" class="hidden" multiple>
                    </div>
                    </label>
                   
                </div>
                <div>
                    <label for="new" class="text-2xl font-bold text-[#01579B] ">ช่องทางการติดต่อ</label>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="fb" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Facebook</label>
                        <div class="relative md:w-3/4">
                            <input type="text" id='fb'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="www.facebook.com">

                        </div>
                    </div>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="line" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">Line</label>
                        <div class="relative md:w-3/4">
                            <input type="text" id='line'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="@xxxxx">

                        </div>
                    </div>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="phone" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">เบอร์โทรศัพท์</label>
                        <div class="relative md:w-3/4">
                            <input type="tel" id='phone'
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg"
                                placeholder="09xxxxxxxx">

                        </div>
                    </div>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <label for="other" class="text-xl font-bold  mb-2 md:w-1/4 md:pr-4">ช่องทางติดต่ออื่นๆ</label>
                        <div class="relative md:w-3/4">
                            <div class="bg-[#01579B] w-full py-4 text-white rounded-md text-xl text-center hover:bg-blue-900 cursor-pointer">
                                เพิ่มช่องทางการติดต่ออื่นๆ</div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="upload" class="text-2xl font-bold text-[#01579B]">ที่อยู่ของสถานที่</label>
                    <div class="mb-6 mt-6 md:flex md:items-center">
                        <div
                            class="mb-2 md:w-1/4 md:pr-4 flex sm:items-start  sm:justify-start items-center justify-center">
                            <img class="h-[300px] "
                                src="https://assets.grab.com/wp-content/uploads/sites/10/2023/05/25185720/2-1.jpg">
                        </div>
                        <div class="relative md:w-3/4  flex flex-col justify-between h-[250px]">

                            <select name="province" id="province"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก จังหวัด</option>
                                <option value="">พะเยา</option>
                            </select>


                            <select name="District" id="District"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก อำเภอ</option>
                            </select>


                            <select name="Subdistrict" id="Subdistrict"
                                class="py-3 px-3 pe-11 block w-full border-2 border-gray-950 rounded-lg font-bold">
                                <option disabled selected>โปรดเลือก ตำบล</option>
                            </select>



                        </div>

                    </div>
                </div>
                <div class="w-full h-[500px] bg-slate-400 items-center justify-center flex">
                    <p class="text-2xl">แผนที่</p>
                </div>
                <label for="" class="text-2xl font-bold  md:w-1/4 md:pr-4 text-[#01579B]">INTERESTS</label>
                <div class="mb-6 mt-6 md:items-center justify-items-between  grid grid-cols-3 gap-x-2 sm:gap-x-20 sm:gap-y-5  text-center">

                    <label for="Adventure"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Adventure lover
                    </label>

                    <label for="Nature"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Nature
                    </label>

                    <label for="Adventure"
                        class="bg-[#616161]  py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Sea
                    </label>

                    <label for="History"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        History
                    </label>

                    <label for="Eating"
                        class="bg-[#616161] py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Eating lover
                    </label>

                    <label for="Scenic"
                        class="bg-[#616161]  py-3 border border-solid border-black rounded-3xl text-white text-xl items-center flex justify-center hover:bg-[#36AD2D]">
                        Scenic lover
                    </label>
                </div>
                <div class="mb-6 mt-6">
                    <button type="button"
                        class="mt-6 p-4 w-full bg-[#F9A825] hover:bg-yellow-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">สร้างบัญชีสถานที่</p>
                    </button>
                    <button type="button" class="mt-6 p-4 w-full bg-[#F93225] hover:bg-red-600 text-white rounded-md shadow-inner flex items-center justify-center">
                        <p class="font-bold text-2xl">ยกเลิกสร้างบัญชีสถานที่</p>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style >
body {
    background-color: #F5F5F5;
    font-family: 'Kanit', sans-serif;
}
</style>

