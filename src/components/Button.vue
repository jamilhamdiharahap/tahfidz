<script setup>
 const emit = defineEmits(["click"]);
</script>

<template>
    <button @click="emit('click')" class="bg-[#4EBF5F] bg-base text-[#FFF] px-4 rounded-2xl text-xs py-2 leading-1 relative flex space-x-2 mx-2">
        <slot />
    </button>
</template>

