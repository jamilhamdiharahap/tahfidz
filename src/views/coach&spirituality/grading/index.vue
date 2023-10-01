<script setup>
import { reactive, onMounted, computed, ref, watch, watchEffect } from 'vue';
import { useGradingStore } from "@/stores/grading.js";
import { useStudentStore } from "@/stores/student.js";
import { useGradeStore } from '@/stores/grade.js';
import Table from '@/components/Table.vue';
import BaseModal from '../../../components/BaseModal.vue';
import Button from '../../../components/Button.vue';
import IconNotFound from '../../../components/icons/iconNotFound.vue';

const store = useGradingStore();
const storeGrade = useGradeStore();

const getItemGrade = computed(() => storeGrade.getItems)
const getStudentFilter = computed(() => store.getStudentFilter);
const getSurahFilter = computed(() => store.getSurahFilter);
const getIsOpen = computed(() => store.getIsOpen);

const detailItems = computed(() => {
    let items = []
    getSurahFilter.value.map((item, index) => {
        items.push({
            ...item,
            details: [
                ...getItemGrade.value
            ]
        })
    })
    return items;
});

const inputBinding = computed(() => {
    let bindItems = {};
    getSurahFilter.value.forEach((item, index) => {
        bindItems[`input${item.nilai_id}`] = "";
    });
    return bindItems;
});

const input = reactive({
    inputBinding,
});

const inputBindingStatus = computed(() => {
    let bindItems = {};
    getSurahFilter.value.forEach((item, index) => {
        bindItems[`input${item.nilai_id}`] = "";
    });
    return bindItems;
});

const inputStatus = reactive({
    inputBindingStatus,
});


// mahasiswa
const mahasiswa = ref("");

// surah
const searchSurah = ref("");
const surah = ref("");
const seq = ref("");
const ayatAwalan = ref(0);
const keterangan = ref("");
const ayatAkhir = ref(0);
const mahasiswaId = ref("");
const sheduleDate = ref("");
const limit = ref(1);
const nilai = ref({});
const status = ref("");
const viewGrade = ref(true);
const resultItems = ref([])

const fields = ref([
    "No",
    "Surah",
    "NILAI",
    "Keterangan",
    "Catatan",
]);

const form = reactive([])

const getGrade = async () => {
    await storeGrade.fetchGrade({ nilaiId: "", status: "true" })
}

const getStudent = async (params) => {
    await store.fetchStudent(params)
}

const getSurah = async () => {
    await store.fetchSurah({ surah: searchSurah.value, seq: "1", mahasiswaId: mahasiswa.value.code }, { index: 0, limit: limit.value })
}

const addSurah = () => {
    limit.value = limit.value + 1
    getSurah();
}

const gradeStudent = (params) => {
    ayatAkhir.value = params.jumlah_ayat
    seq.value = params.seq
    store.updateIsOpen(true)
}

const closeModal = () => {
    store.updateIsOpen(false)
}

const removeSurah = () => {
    if (limit.value > 1) {
        limit.value = limit.value - 1
        getSurah();
    }
}

const validate = (key, seq) => {
    let seqSurah = parseInt(seq);
    if (key == seqSurah) {
        return true;
    }
    return false;
}

const createGreading = async () => {
    let result = []
    resultItems.value.forEach(item => {
        for (const key in inputStatus?.inputBindingStatus) {
            if (validate(key, item.surah_seq)) {
                item.is_lulus = inputStatus.inputBindingStatus[key] == "true" ? true : false
            }
        }
        result.push(item)
    });

    await store.fetchGrading(result);
}

const clearInputBinding = () => {
    for (const key in input.inputBinding) {
        input.inputBinding[key] = "";
    }
    keterangan.value = ""
};

const saveTemporarily = () => {
    const nilai = [];
    getItemGrade.value.forEach((item) => {
        const nilaiItem = {
            nilai_id: item.nilai_id,
            nilai: input.inputBinding[`${item.nilai_id}`] || '',
            keterangan: '',
        };
        nilai.push(nilaiItem);
    });

    let newPayload = {
        penilaian_id: "",
        mahasiswa_id: mahasiswa.value.code,
        waktu: sheduleDate.value,
        surah_seq: seq.value,
        juz: "",
        surah_awalan: 1,
        surah_akhir: parseInt(ayatAkhir.value),
        is_lulus: inputBindingStatus.value,
        keterangan: keterangan.value,
        details: nilai
    };

    const existingItemIndex = resultItems.value.findIndex(item => item.surah_seq === newPayload.surah_seq);
    console.log(existingItemIndex)
    if (existingItemIndex !== -1) {
        resultItems.value[existingItemIndex] = newPayload;
    } else {
        resultItems.value.push(newPayload);
    }

    closeModal();
    clearInputBinding();
}

watch(sheduleDate, (value) => {
    getStudent(value);
})

watch(mahasiswa, (value) => {
    getSurah()
    getGrade()
})


// store
const storeMhs = useGradeStore();
const generationStore = useStudentStore();
// end store


// data
const generation = ref("");
const student = ref("");
const payloadStudent = reactive({ id: "", angkatan: "", nameAngkatan: "", status: "" });
// end data


// computed
const getGenerationFilter = computed(() => generationStore.getGenerationFilter);
const getStudentItems = computed(() => generationStore.getStudentFilter);
const getItemMhs = computed(() => storeMhs.getItemMhs);
// end computed


// methods


const getGeneration = async () => {
    generationStore.fetchGeneration(payloadStudent)
}

const getStudentGrade = async () => {
    generationStore.fetchStudent(payloadStudent)
}

const viewsGrading = async () => {
    viewGrade.value = !viewGrade.value
    if (viewGrade.value == false) {
        await getStudentGrade();
        await getGeneration();
    }
}


const seeGrade = async () => {
    await storeMhs.fetchGradeMhs({ surahId: "", tanggal: "", mahasiswaId: student.value?.code })
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
        getStudentGrade();
    } else {
        payloadStudent.angkatan = value.code
        getStudentGrade();
    }
});
// end watch


// mounted

// onMounted(() => {
//     getSurah();
// })
</script>

<template>
    <div>
        <div class="shadow-md rounded-md bg-slate-50 w-full min-h-[70vh] py-8 px-8">
            <div>
                <Button :class="{ 'ml-auto': !viewGrade }" @click="viewsGrading">{{ viewGrade ? 'Lihat Penilaian'
                    : 'Penilaian' }}</Button>
            </div>
            <div v-if="viewGrade" class="grid md:grid-cols-4 mb-4 items-center py-4 gap-2 md:gap-4">
                <div class="space-x-4 mt-auto col-span-2">
                    <button class="bg-[#BB2525] rounded-full bg-base" @click="removeSurah">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M200-440v-80h560v80H200Z" />
                        </svg>
                    </button>
                    <button class="bg-[#557A46] rounded-full bg-base" :disabled="detailItems.length <= 0" @click="addSurah">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                    </button>
                </div>
                <div class="relative min-w-[16vw]">
                    <div>
                        <label for="" class="text-xs leading-3 font-light">Tanggal</label>
                    </div>
                    <input type="date"
                        class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                        v-model="sheduleDate" />
                </div>
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Mahasiswa</label>
                    <v-select :disabled="sheduleDate.length == 0" :options="getStudentFilter" value="code" label="label"
                        v-model="mahasiswa" class="bg-white rounded-md text-xs"></v-select>
                </div>
            </div>
            <div v-else class="flex mb-4 items-center gap-4 flex-wrap">
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
            <template v-if="viewGrade">
                <div class="relative overflow-x-auto max-h-[50vh]">
                    <table v-if="detailItems.length > 0" class="text-gray-500 w-full">
                        <thead class="text-xs text-white bg-base rounded-md uppercase bg-[#4EBF5F] px-2 sticky top-0">
                            <th v-for="(field, index) in fields" :key="index"
                                :class="index == 0 ? 'rounded-l-md' : index == fields.length - 1 ? 'rounded-r-md' : ''"
                                class="py-2 px-2">
                                {{ field }}
                                <!-- <tr v-if="field == 'NILAI'" class="relative flex justify-between lowercase text-xs px-4">
                                <td v-for="grade in getItemGrade" class="text-xs">{{ grade.nama_penilaian }}</td>
                            </tr> -->
                            </th>
                        </thead>
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50 border-b" v-for="(item, index) in detailItems">
                                <td class="py-4 leading-6 rounded-t-md">
                                    {{ index + 1 }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nama_surah }}
                                </td>
                                <td class="py-4 leading-6 w-[10vw]">
                                <td class="flex justify-center gap-4">
                                    <input :disabled="true" type="text" value="40" class="w-14 px-2" />
                                    <button @click="gradeStudent(item)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCC70" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z" />
                                        </svg>
                                    </button>
                                </td>
                                </td>
                                <td>
                                    <form class="space-x-3 flex flex-wrap justify-center">
                                        <label for="age1">
                                            <input type="radio" id="age1" name="status"
                                                v-model="inputStatus.inputBindingStatus[`${item.seq}`]" value="true">
                                            Lulus
                                        </label>
                                        <label for="age2">
                                            <input type="radio" id="age2" name="status"
                                                v-model="inputStatus.inputBindingStatus[`${item.seq}`]" value="false">
                                            Tidak Lulus
                                        </label>
                                    </form>
                                    <!-- <div class="space-x-3 flex flex-wrap justify-center">
                                    <label v-for="(option, index) in options" :key="index">
                                        {{ option.label }}
                                        <input v-model="inputStatus.inputBindingStatus[`${item.seq}`]" :value="option.value" type="checkbox">
                                    </label>
                                </div> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-else class="text-gray-500 w-full">
                        <thead class="text-xs text-white bg-base rounded-md uppercase bg-[#4EBF5F] px-2 sticky top-0">
                            <th v-for="(field, index) in fields" :key="index"
                                :class="index == 0 ? 'rounded-l-md' : index == fields.length - 1 ? 'rounded-r-md' : ''"
                                class="py-2 px-2">
                                {{ field }}
                            </th>
                        </thead>
                        <tbody class="pt-4 h-60">
                            <tr class="w-full h-full">
                                <td class="relative" :colspan="fields.length">
                                    <div class="absolute inset-0 flex justify-center items-center">
                                        <IconNotFound />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else>
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
                                <p :class="grade.average == '' ? 'text-red-400' : 'text-[#4EBF5F]'" class="text-3xl p-0">
                                    &bull;
                                </p>
                            </div>
                            <div class="w-4/5 h-10 py-3 px-1">
                                <p class="hover:text-blue-dark text-xs">{{ grade.nama_surah }}</p>
                            </div>
                            <div class="overflow-x-auto min-w-[40px]">
                                <div class="w-1/5 h-10 text-right p-3 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCC70" height="24"
                                        viewBox="0 -960 960 960" width="24">
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
            </template>
            <div :class="{ 'hidden': !viewGrade }" class="relative py-4 space-y-2">
                <Button :disabled="resultItems.length == 0" class="ml-auto"
                    @click="createGreading">Simpan Data</Button>
            </div>
            <BaseModal :open="getIsOpen" @close="closeModal" :width="'w-96'">
                <div class="mb-2">
                    <p>Penilaian</p>
                </div>
                <div class="mx-auto grid-cols-3 grid gap-2 py-4">
                    <div v-for="(item, index) in getItemGrade" class="relative">
                        <div>
                            <label for="" class="text-xs leading-3 font-light">{{ item.nama_penilaian }}</label>
                        </div>
                        <input type="text" v-model="input.inputBinding[`${item.nilai_id}`]"
                            class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2" />
                    </div>
                </div>
                <div>
                    <textarea type="text" v-model="keterangan" placeholder="Keterangan..."
                        class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"> </textarea>
                </div>
                <div class="ml-auto">
                    <Button class="ml-auto" @click="saveTemporarily">
                        Simpan
                    </Button>
                </div>
            </BaseModal>
        </div>
    </div>
</template>