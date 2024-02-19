<template>
    <div class="relative"  v-click-outside="clickedOutside">
        <input :value="data.length === 0 ? '' : value" @input="searchResults" @focusin="showOptions = true" :placeholder="placeholder" ref="input" tabindex="1"
            :class="inputClass" />
        <span v-if="showOptions === false" @click="showList()"
            class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
            <font-awesome-icon :icon="['fas', 'caret-down']" class="text-[24px]" />
        </span>
        <span v-else-if="showOptions" @click="reset()"
            class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-[24px]" />
        </span>
        <div v-show="showOptions" @click.self="handleSelf()" @focusout="showOptions = false" tabindex="1"
            :class="dropdownClass">
            <ul class="py-1" v-show="data.length && value === '' || fulloptions">
                <li v-for="(item, index) in data" :key="index" @click="handleClick(item)"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-200">
                    {{ item[search_key] }}
                </li>
            </ul>
            <ul class="py-1" v-show="Results.length && value !== '' && fulloptions === false">
                <li v-for="(item, index) in Results" :key="index" @click="handleClick(item)"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-200">
                    {{ item[search_key] }}
                </li>
            </ul>

        </div>
    </div>
</template>
  
<script setup>

const props = defineProps({
    placeholder: {
        type: String,
        default: "Enter text here.",
    },
    data: Array,
    search_key: String,
    inputClass: {
        type: String,
        default: "border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none focus:shadow-outline",
    },
    dropdownClass: {
        type: String,
        default: "absolute w-full text-black z-[200] bg-white border border-gray-300 mt-1 mh-48 overflow-hidden overflow-y-scroll rounded-md shadow-md",
    },
});

const input = ref("");
const value = ref("");

const showOptions = ref(false);
const fulloptions = ref(false);
const chosenOption = ref("");
const searchTerm = ref("");

const Results = ref([]);
watch(() => props.data,() => {
    console.log('prop value changed', props.data)
    if (props.data.length > 0) {
        Results.value = props.data;
    }else{
        Results.value = [];
        value.value = "";
    }
  }
)


const selected = defineModel();

function searchResults(event) {
    value.value = event.target.value;

    if(event.target.value === "") {
        Results.value = props.data;
    }else{
        Results.value = props.data.filter((item) => {
            let inputValue = event.target.value.toLowerCase();
            let provinceName = item[props.search_key];
            return provinceName.includes(inputValue);
        });
    }

}



const emit = defineEmits(['input', 'chosen'], ['update:modelValue'])


function showList() {
    showOptions.value = true;
    fulloptions.value = true;
}

function reset() {
    chosenOption.value = "";
    value.value = "";
    showOptions.value = false;
    fulloptions.value = false;

    emit("input", "");
    emit("chosen", null);
}

function handleInput(evt) {
    emit("input", evt.target.value);
    searchTerm.value = evt.target.value;
    showOptions.value = true;
}

function handleSelf() {
    emit("input", item.name);
    emit("chosen", item);
    chosenOption.value = item.name;
    showOptions.value = false;
    input.value.focus();
}

// ส่วนของการเลือก
function handleClick(item) {
    emit("input", "");
    chosenOption.value = "";
    value.value = item[props.search_key];
    emit("chosen", item);

    showOptions.value = false;
}

function clickedOutside() {
    showOptions.value = false;

    if (!chosenOption.value) {
        emit("input", "");
    }

}


</script>
  
<style scoped>
.mh-48 {
    max-height: 10rem;
}
</style>