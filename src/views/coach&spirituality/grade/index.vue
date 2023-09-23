<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Table.vue';
import { useGradeStore } from '@/stores/grade.js';
import Button from '../../../components/Button.vue';

const store = useGradeStore();

const fields = ref([
    "No",
    "Nilai",
    "Status",
    "Action",
]);

const statusItems = ref([
    { label: "Active", code: true },
    { label: "Non Active", code: false },
])

const status = ref("");

const getItems = computed(() => store.getItems)

const getGrade = () => {
    store.fetchGrade({ nilaiId: "", status: "" })
}


onMounted(() => {
    getGrade();
});
</script>

<template>
    <div>
        <div class="w-full min-h-[80vh] py-8 px-8">
            <div class="flex mb-4 items-center">
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Status</label>
                    <v-select :options="statusItems" value="code" label="label" v-model="status"
                        class="text-xs leading-4"></v-select>
                </div>
                <div class="mt-auto ml-auto">
                    <Button>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="#FFFFFF" viewBox="0 -960 960 960"
                                width="16">
                                <path
                                    d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.615q-49.5 0-84.75-35.25T240-624.615q0-49.501 35.25-84.751 35.25-35.25 84.75-35.25t84.75 35.25Q480-674.116 480-624.615q0 49.5-35.25 84.75T360-504.615ZM80-215.384v-65.847Q80-306 94.423-327.577q14.423-21.577 38.808-33.5 56.615-27.154 113.307-40.731Q303.231-415.385 360-415.385q56.769 0 113.462 13.577 56.692 13.577 113.307 40.731 24.385 11.923 38.808 33.5Q640-306 640-281.231v65.847H80Zm40-40.001h480v-25.846q0-13.307-8.577-25-8.577-11.692-23.731-19.769-49.384-23.923-101.836-36.654Q413.405-375.385 360-375.385q-53.405 0-105.856 12.731Q201.692-349.923 152.308-326q-15.154 8.077-23.731 19.769-8.577 11.693-8.577 25v25.846Zm240-289.23q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.23Z" />
                            </svg>
                        </span>
                        <span>
                            Create
                        </span>
                    </Button>
                </div>
            </div>
            <div>
                <div class="relative overflow-x-auto h-auto max-h-full">
                    <Table :fields="fields">
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50" v-for="(item, index) in getItems">
                                <td class="py-4 leading-6">
                                    {{ index + 1 }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nama_penilaian }}
                                </td>
                                <td class="py-4 leading-6" v-if="item.is_active">
                                    Active
                                </td>
                                <td class="py-4 leading-6" v-else>
                                    Non Active
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

<style scoped></style>