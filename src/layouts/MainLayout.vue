<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import AsideMenu from '../components/AsideMenu.vue';
import BreadCrumb from "../components/BreadCrumb.vue";

const route = useRoute();
const user = computed(() => JSON.parse(localStorage.getItem('auth')));
const breadcrumbs = computed(() => {
    return route.meta.title;
})
</script>

<template>
    <div>
        <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#F2F2F2]">
            <Header>
                <BreadCrumb :text="breadcrumbs" />
            </Header>
            <AsideMenu />
            <div class="h-full ml-14 mb-10 md:ml-64 pr-4 pl-2">
                <main class="w-full px-3 sm:px-10">
                    <div v-if="breadcrumbs != 'Schedule'" class="md:flex md:text-xs text-[2px] justify-between items-center h-10 bg-white sticky top-16 mb-6 px-4 rounded-md">
                        <BreadCrumb :text="breadcrumbs" />
                        <span class="text-xs"><i class="text-gray-400 leading-5">{{user[2]}}</i> / {{ breadcrumbs }}</span>
                    </div>
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>