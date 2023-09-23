<script setup>
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    menuItems: Array
});

const router = useRoute();
const { menuItems } = toRefs(props);

function isActive(route) {
    console.log(route)
    return router.path === route;
}
</script>


<template>
    <li v-for="item in menuItems" class="rounded-md" :class="{ 'text-[#252525] bg-[#F2F2F2]': isActive(item.path) }">
        <router-link :to="item.path"
            class="relative flex flex-row items-center h-11 focus:outline-none text-white-600 border-l-4 border-transparent pr-6">
            <span class="inline-flex justify-center items-center ml-4">
                <div v-html="item.icon"></div>
            </span>
            <span class="ml-2 md:text-xs sm:text-md tracking-wide truncate">{{ item.label }}</span>
        </router-link>
    </li>
</template>