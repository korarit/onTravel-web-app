<template>
    <ClientOnly>
        <div class="w-[100%] bg-[#F9A825] py-12 px-12 2xl:px-24 flex flex-wrap justify-between">

            <!-- about web application-->
            <div class="w-[29%]">
                <div class="w-[100%] h-[60px] bg-slate-300 rounded-xl mb-6">

                </div>
                <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">เว็บไซต์แนะนำ ที่กิน ที่พัก ที่เที่ยวแบบคนมีสไตล์นำเสนอข้อมูลสถานที่ท่องเที่ยวที่พักในประเทศไทย แบบสามารถเที่ยวตามได้จริง</p>
            </div>
            <!-- Link in web -->
            <div class="w-[28%]">
                <div class="w-[100%] h-[60px] mb-6 flex">
                    <p class="text-[24px] font-extrabold self-end leading-6">LINKS</p>
                </div>
                <div class="flex space-x-4">
                    <div class="w-[50%]">
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- หน้าหลัก</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- ที่พัก</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- แผนการท่องเที่ยว</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- สถานที่ในจังหวัด</p>
                    </div>
                    <div class="w-[50%]">
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- สมัครสมาชิก</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- จัดการบัญชีผู้ใช้</p>
                    </div>
                </div>
            </div>
            <!-- contact -->
            <div class="w-fit">
                <div class="w-[100%] h-[60px] mb-6 flex">
                    <p class="text-[24px] font-extrabold self-end leading-6">CONTACT</p>
                </div>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">ติดต่อเรา</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">โทร : 000 xxx xxxx คุณกุ๊กไก่</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">โทร : 000 xxx xxxx คุณนอนน้อย</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">อีเมล์ : contact@ontravel.go</p>
                
                <!-- social contact icon-->
                <div class="mt-6 flex">
                    <button class="w-[40px] h-[40px] rounded-full bg-black flex justify-center items-center">
                        <font-awesome-icon class="text-[#F5F5F5] h-[20px]" :icon="['fab', 'facebook-f']" />
                    </button>
                    <button class="w-[40px] h-[40px] rounded-full bg-black flex justify-center items-center ml-4">
                        <font-awesome-icon class="text-[#F5F5F5] h-[20px]" :icon="['fab', 'instagram']" />
                    </button>
                    <button class="w-[40px] h-[40px] rounded-full bg-black flex justify-center items-center ml-4">
                        <font-awesome-icon class="text-[#F5F5F5] h-[20px]" :icon="['fab', 'twitter']" />
                    </button>
                    <button class="w-[40px] h-[40px] rounded-full bg-black flex justify-center items-center ml-4">
                        <font-awesome-icon class="text-[#F5F5F5] h-[20px]" :icon="['fab', 'linkedin']" />
                    </button>

                </div>
            </div>

        </div>
    </ClientOnly>
</template>