<script setup lang="ts">
const language = ref<any>(await inject('language'))
</script>
<template>
    <ClientOnly>
        <div class="w-[100%] bg-[#F9A825] py-12 px-12 2xl:px-24 flex flex-wrap justify-between">

            <!-- about web application-->
            <div class="w-[25%]">
                <div class="w-[100%] h-auto mb-6">
                    <img src="/logo.svg" style="width: 100%;height: ;">
                </div>
                <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">{{ language.footer.about }}</p>
            </div>
            <!-- Link in web -->
            <div class="w-[28%]">
                <div class="w-[100%] h-[60px] mb-6 flex">
                    <p class="text-[24px] font-extrabold self-end leading-6">{{ language.footer.link_title }}</p>
                </div>
                <div class="flex flex-col xl:flex-row 2xl:space-x-4">
                    <div class="w-fit">
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.home }}</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.hotel }}</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.plan }}</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.province }}</p>
                    </div>
                    <div class="w-fit">
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.register }}</p>
                        <p class="text-[18px] font-medium text-[#F5F5F5] text-justify leading-9">- {{ language.footer.link.user }}</p>
                    </div>
                </div>
            </div>
            <!-- contact -->
            <div class="w-fit">
                <div class="w-[100%] h-[60px] mb-6 flex">
                    <p class="text-[24px] font-extrabold self-end leading-6">{{ language.footer.contact_title }}</p>
                </div>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">{{ language.footer.contact_subtitle }}</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">{{ language.footer.contact.phone1 }}</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">{{ language.footer.contact.phone }}</p>
                <p class="text-[18px] font-medium text-[#F5F5F5] leading-9">{{ language.footer.contact.email }}</p>
                
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