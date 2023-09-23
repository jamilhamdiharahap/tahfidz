<script setup>
import AsideMenuItem from './AsideMenuItem.vue';
import { useMenuStore } from "../stores/menu.js";
import { computed, onMounted } from "vue";

const store = useMenuStore();

const getMenu = computed(() => store.getMenu);

onMounted(() => {
    store.fetchMenu(localStorage.getItem("auth"));
})
</script>

<template>
    <div
        class="fixed flex flex-col top-14 left-0 md:left-4 bg-[#FFFFFF] opacity-1 w-14 hover:w-64 md:w-64 shadow-xl min-h-[90vh] transition-all duration-300 border-none z-10 sidebar md:rounded-xl">
        <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul class="flex flex-col py-4 space-y-1 md:px-2">
                <!-- <li class="hidden md:block">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-400 uppercase">Main</div>
                    </div>
                </li> -->
                <AsideMenuItem :menuItems="getMenu" />
            </ul>
        </div>
    </div>
</template>