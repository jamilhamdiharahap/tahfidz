<script setup>
import { onMounted, ref } from 'vue';
import Table from '../../../components/Table.vue';
import Button from '../../../components/Button.vue';

import { useGradeStore } from '@/stores/grade.js';

const store = useGradeStore();

const fields = ref([
    "No",
    "Angkatan",
    "Nama Angkatan",
    "Status",
    "Action",
]);

onMounted(async () => {
    await store.fetchGradeMhs({surahId : "", tanggal: "", mahasiswaId: "3"})
})
</script>

<template>
    <div>
        <div class="w-full min-h-[80vh] py-8 px-8">
            <div class="flex mb-4 items-center">
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Status</label>
                    <v-select :options="statusItems" value="code" label="label" v-model="status"
                        class="rounded-md text-xs"></v-select>
                </div>
            </div>
            <div>
                <div class="relative overflow-x-auto h-auto max-h-full hover:max-h-screen">
                    <Table :fields="fields">
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50 border-b" v-for="(item, index) in getItemsActive">
                                <td class="py-4 leading-6">
                                    {{ index + 1 }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.angkatan }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nama_angkatan }}
                                </td>
                                <td class="py-4 leading-6">
                                    Active
                                </td>
                                <td class="py-4 leading-6">
                                    <button class="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                            width="24">
                                            <path
                                                d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l113-113 169 169-112 112ZM120-120v-170l424-424 170 170-424 424H120Zm453-453-28-28 56 56-28-28Z" />
                                        </svg>
                                    </button>
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