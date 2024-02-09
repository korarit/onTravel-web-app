<template>
    <div class="flex">

        <div v-if="star != 0" class="flex">
            <font-awesome-icon :icon="['fas', 'star']" class="text-[24px] text-[#ffb760] first:ml-0 first:mr-1 mx-1"  v-for="s in star" :key="s" />
        </div>

        <font-awesome-icon :icon="['fas', 'star-half-stroke']" class="text-[24px] text-[#ffb760] mx-1" v-if="halfStar === 1" />

        <div v-if="emptyStar != 0" class="flex">
            <font-awesome-icon :icon="['far', 'star']" class="text-[24px] text-[#ffb760] first:ml-0 first:mr-1 mx-1" v-for="i in emptyStar" :key="i" />
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    Point: {
        type: Number,
        default: 0
    }
})
const star = ref(Math.floor(props.Point))
const halfStar = ref(props.Point - Math.floor(props.Point) >= 0.5 ? 1 : 0)
const emptyStar = ref((5 - star.value) - halfStar.value)

</script>