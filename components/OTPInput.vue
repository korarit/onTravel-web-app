<script lang="ts" setup>
const props = defineProps<{
  fields: number;
}>();

const data = ref(Array(props.fields).fill('')); // Initialize with empty values
const firstInputEl:any = ref(null);
const emit = defineEmits(['update:modelValue']);

watch(
  () => data,
  (newVal:any) => {
    if (
      newVal.every((value:any) => value !== '') &&
      newVal.length === props.fields
    ) {
      emit('update:modelValue', Number(newVal.join('')));
    } else {
      emit('update:modelValue', null);
    }
  },
  { deep: true }
);

const handleOtpInput = (e: Event, index:any) => {

  const target = e.target as any;
  if (e && target.nextElementSibling) {
    target.nextElementSibling.focus();
  } else if (e && target.previousElementSibling) {
    target.previousElementSibling.focus();
  }

  // Check if the current field is empty and move focus to the previous field if needed
  if (e && target.previousElementSibling && data.value[index] === '') {
    target.previousElementSibling.focus();
  }
};



const handlePaste = (e:any) => {
  const pasteData = e.clipboardData.getData('text');
  let nextEl = firstInputEl.value[0].nextElementSibling;
  for (let i = 1; i < pasteData.length; i++) {
    if (nextEl && data.value[i - 1] !== '') {
      data.value[i] = pasteData[i];
      nextEl = nextEl.nextElementSibling;
    }
  }
};
</script>

<template>
  <div class="otp w-full flex justify-between">
      <input
        v-for="field in fields"
        :key="field - 1"
        v-model="data[field - 1]"
        ref="firstInputEl"
        type="text"
        maxlength="1"
        class="border border-black shadow-inner shadow-[#3d3d3d87] rounded w-[10%] h-[70px] text-center text-[30px] font-semibold focus:outline-3 outline-[#6166E7] bg-[#D9D9D9]"
        @input="handleOtpInput($event, field - 1)"
        @paste="field === 1 && handlePaste($event)"
      />
  </div>
</template>