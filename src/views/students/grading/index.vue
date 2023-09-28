<script setup>
import { onMounted, ref, computed, reactive, watch, watchEffect } from 'vue';
import Table from '@/components/Table.vue';
import Button from '@/components/Button.vue';

import { useGradeStore } from '@/stores/grade.js';
import { useStudentStore } from '@/stores/student.js';

// store
const store = useGradeStore();
const generationStore = useStudentStore();
// end store


// data
const generation = ref("");
const student = ref("");
const payloadStudent = reactive({ angkatan: "", nameAngkatan: "", status: "" });
// end data


// computed
const getGenerationFilter = computed(() => generationStore.getGenerationFilter);
const getStudentItems = computed(() => generationStore.getStudentFilter);
const getItemMhs = computed(() => store.getItemMhs);
// end computed


// methods
const getGeneration = async () => {
    generationStore.fetchGeneration(payloadStudent)
}

const getStudent = async () => {
    generationStore.fetchStudent(payloadStudent)
}

const seeGrade = async () => {
    await store.fetchGradeMhs({ surahId: "", tanggal: "", mahasiswaId: student.value?.code })
}

const isDropdownOpen = ref(Array(getItemMhs.length).fill(false));
const currentHeight = ref(10);

const toggleDropdown = (index) => {
    isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};



const animateHeigth = () => {
    if (currentHeight.value < 20) {
        currentHeight.value += 5;
    }
}

watchEffect(() => {
    const timer = setInterval(animateHeigth, 2000);
    if (currentHeight.value >= 20) {
        clearInterval(timer);
    }
});

// end methods


// watch
watch(generation, (value) => {
    if (value == null) {
        payloadStudent.angkatan = ""
        getStudent();
    } else {
        payloadStudent.angkatan = value.code
        getStudent();
    }
});
// end watch


// mounted
onMounted(async () => {
    await getStudent();
    await getGeneration();
})
// end mounted
</script>

<template>
    <div>
        <div class="w-full min-h-[80vh] py-8 px-8 shadow-md rounded-md bg-slate-50">
            <div class="flex mb-4 items-center gap-4 flex-wrap">
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Angkatan</label>
                    <v-select :options="getGenerationFilter" value="code" label="label" v-model="generation"
                        class="rounded-md text-xs"></v-select>
                </div>
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Mahasiswa</label>
                    <v-select :options="getStudentItems" value="code" label="label" v-model="student"
                        class="rounded-md text-xs"></v-select>
                </div>
                <Button class="mt-auto" @click="seeGrade" :disabled="false">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="16" viewBox="0 -960 960 960"
                            width="16">
                            <path
                                d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                        </svg>
                    </span>
                    <span>
                        Lihat
                    </span>
                </Button>
            </div>
            <div>
                <div class="relative flex justify-end">
                    <div class="flex cursor-pointer my-1 items-center rounded px-4">
                        <p class="text-3xl p-0 text-[#4EBF5F]">&bull;</p>
                        <p class="text-xs p-0 text-[#4EBF5F]">Sudah Dinilai</p>
                    </div>
                    <div class="flex cursor-pointer my-1 items-center rounded">
                        <p class="text-3xl p-0 text-red-400">&bull;</p>
                        <p class="text-xs p-0 text-red-400">Belum Dinilai</p>
                    </div>
                </div>
                <div class="relative overflow-x-auto h-auto max-h-full hover:max-h-screen">
                    <div :class="{ ['h-' + currentHeight]: isDropdownOpen[index], '': !isDropdownOpen[index] }"
                        class="md:flex gap-2 cursor-pointer my-1 hover:bg-gray-200 rounded border-b-gray-200 border-b-[1px] hover:text-[#252525]"
                        v-for="(grade, index) in getItemMhs" :key="index" @click="toggleDropdown(index)">
                        <div class="w-8 h-10 text-center py-1">
                            <p :class="grade.average == '' ? 'text-red-400' : 'text-[#4EBF5F]'" class="text-3xl p-0">&bull;
                            </p>
                        </div>
                        <div class="w-4/5 h-10 py-3 px-1">
                            <p class="hover:text-blue-dark text-xs">{{ grade.nama_surah }}</p>
                        </div>
                        <div class="overflow-x-auto min-w-[40px]">
                            <div class="w-1/5 h-10 text-right p-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCC70" height="24" viewBox="0 -960 960 960"
                                    width="24">
                                    <path
                                        d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z" />
                                </svg>
                            </div>
                        </div>
                        <div class="w-1/5 h-10 text-right p-3">
                            <p class="text-xs text-grey-dark">{{ grade.keterangan }}</p>
                        </div>
                        <div class="w-1/5 h-10 text-right p-3">
                            <p class="text-xs text-grey-dark">{{ grade.waktu }}</p>
                        </div>
                        <div class="w-1/5 h-10 text-right p-3 relative">
                            <p class="text-xs text-grey-dark">{{ grade.average }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.style-chooser {
    min-width: 13.9vw;
    --vs-font-size: 1em;
    --vs-border-color: #cbcbcb;
    --vs-controls-color: #01a1b9;
    --vs-dropdown-bg: #ffff;
    --vs-dropdown-bg: #ffff;
    --vs-dropdown-color: #101010;
    --vs-dropdown-option-color: rgb(0, 0, 0);
    --vs-selected-bg: #664cc3;
    --vs-selected-color: #000000;
    --vs-search-input-color: #595858;
    --vs-line-height: 2vw;
}
</style>