<script setup>
import { reactive, onMounted, computed, ref, watch } from 'vue';
import { useGradingStore } from "@/stores/grading.js";
import Table from '@/components/Table.vue';
import { useGradeStore } from '@/stores/grade.js';
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

const options = ref([
    { label: 'Lulus', value: true, selected: false },
    { label: 'Tidak Lulus', value: false, selected: false },
])

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

const createGreading = () => {
    let resutls = []
    for (let index = 0; index < resultItems.value.length - 1; index++) {
        if (resultItems.value[index].surah_seq === resultItems.value[index + 1].surah_seq) {
            resutls.push(resultItems.value[index]);
        }
    }
    console.log(resutls)
}

const details = computed(() => {
    const nilai = [];
    getItemGrade.value.forEach((item) => {
        const nilaiItem = {
            nilai_id: item.nilai_id,
            nilai: input.inputBinding[`${item.nilai_id}`] || '',
            keterangan: '',
        };
        nilai.push(nilaiItem);
    });

    return nilai;
});

const clearInputBinding = () => {
    for (const key in input.inputBinding) {
        input.inputBinding[key] = "";
    }
    keterangan.value = ""
};

const saveTemporarily = () => {
    let payload = {
        penilaian_id: "",
        mahasiswa_id: mahasiswa.value.code,
        waktu: sheduleDate.value,
        surah_seq: seq.value,
        juz: "",
        surah_awalan: 1,
        surah_akhir: parseInt(ayatAkhir.value),
        is_lulus: "",
        keterangan: keterangan.value,
        details: details.value
    }
    resultItems.value.push(payload)
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


// onMounted(() => {
//     getSurah();
// })
</script>

<template>
    <div>
        <div class="shadow-md rounded-md bg-slate-50 w-full min-h-[70vh] py-8 px-8">
            <div class="grid md:grid-cols-4 mb-4 items-center py-4 gap-2 md:gap-4">
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
            <div class="relative py-4">
                <Button class="ml-auto" @click="createGreading">Simpan Data</Button>
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