<template>
    <table class="w-full">
        <thead class="text-xs text-white bg-base rounded-md uppercase bg-[#4EBF5F] px-2 sticky top-0">
            <th v-for="(field, index) in fields" :key="index"
                :class="index == 0 ? 'rounded-l-md' : index == fields.length - 1 ? 'rounded-r-md' : ''" class="py-2 px-2">
                {{ field }}
            </th>
        </thead>
        <slot />
    </table>
</template>


<script setup>
const { fields } = defineProps(["fields"]);

</script>