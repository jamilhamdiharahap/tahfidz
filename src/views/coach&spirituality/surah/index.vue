<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Table.vue';
import { useSurahStore } from '@/stores/surah';
import Button from '../../../components/Button.vue';

const store = useSurahStore();

const fields = ref([
    "Surah",
    "Nama Surah",
    "Jumlah Ayat",
    "Arti Surah"
]);

const getItems = computed(() => store.getItems)
const searchSurah = ref("");
const seq = ref("");
const mahasiswaId = ref("");

const getSurah = () => {
    store.fetchSurah({ surah: searchSurah.value, seq: seq.value, mahasiswaId: mahasiswaId.value })
}


onMounted(() => {
    getSurah();
});
</script>

<template>
    <div>
        <div class="shadow-md rounded-md bg-slate-50 w-full min-h-[50vh] py-5 px-8">
            <div>
                <div class="relative overflow-x-auto max-h-[70vh]">
                    <Table :fields="fields">
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50 border-b" v-for="(item, index) in getItems">
                                <td class="py-4 leading-6">
                                    {{ item.surah }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nama_surah }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.jumlah_ayat }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.arti_surah }}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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