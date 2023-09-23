<script setup>
import { ref, computed } from 'vue';
import IconLogo from './icons/IconLogo.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore();

const dropDownOpen = ref(false)

const user = computed(() => JSON.parse(localStorage.getItem('auth')));

const toggleDropDown = () => {
    dropDownOpen.value = !dropDownOpen.value
}

const logout = () => {
    dropDownOpen.value = false
    store.logout({ router })
}

</script>

<template>
    <div class="sticky top-0 h-14 z-10 bg-[#F2F2F2] opacity-60">
        <div class="flex mx-auto justify-between items-center h-14 w-full md:px-8 px-4">
            <!-- <slot /> -->
            <div class="flex items-center space-x-4 ml-auto">
                <span class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm240 320H240q-33 0-56.5-23.5T160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160Zm-480-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                </span>
                <button @click="toggleDropDown" class="px-4 py-2 border-none">
                    <span class="relative hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path
                                d="M480-362q-8 0-15-2.5t-13-8.5L268-557q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-373q-6 6-13 8.5t-15 2.5Z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <div v-show="dropDownOpen" class="fixed inset-0 z-10 w-full h-full" @click="toggleDropDown" />
        <transition enter-active-class="transition duration-150 ease-out transform" enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-150 ease-in transform"
            leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
            <div v-show="dropDownOpen" class="absolute right-10 z-20 w-40 py-2 mt-6 top-2 bg-white rounded-lg shadow-xl">
                <div class="px-4 py-2 leading-6">
                    <h2 class="text-sm font-semibold">{{ user[2] }}</h2>
                    <h2 class="text-xs">{{ user[3] }}</h2>
                </div>
                <div class="block px-4 py-1 text-sm border-t-2">
                    <button class="relative w-full px-2 rounded-md flex justify-between items-end" @click="logout">
                        <span class="text-xs">
                            Log out
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#b1000e" height="24" viewBox="0 -960 960 960"
                                width="24">
                                <path
                                    d="M120-120v-720h360v80H200v560h280v80H120Zm520-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>


<style scoped></style>