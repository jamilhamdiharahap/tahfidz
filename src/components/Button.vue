<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
    bg: {
        type: String,
        default: undefined,
    },
});
</script>

<template>
    <button @click="emit('click')" :class="{
        'bg-[#4EBF5F]': !bg,
        [bg]: bg,
        'bg-base text-[#FFF] px-4 rounded-2xl text-xs py-2 leading-1 relative flex space-x-2 mx-2': true
    }">
        <slot />
    </button>
</template>

