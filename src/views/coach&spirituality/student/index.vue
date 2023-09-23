<script setup>
import { onMounted, computed, ref, watch, reactive } from 'vue';
import Table from '../../../components/Table.vue';
import { useStudentStore } from '../../../stores/student';
import BaseModal from '../../../components/BaseModal.vue';
import Button from '../../../components/Button.vue';

const store = useStudentStore();

const fields = ref([
    "No",
    "Nama Mahasiswa",
    "Email",
    "No. HP",
    "Angkatan",
    "status",
    "Action",
]);

const statusItems = ref([
    { label: "Active", code: true },
    { label: "Non Active", code: false },
])

const status = ref("");
const angkatan = ref("")

const form = reactive({
    mahasiswa_id: "",
    nama_mahasiswa: "",
    email: "",
    nomor_hp: "",
    is_active: true,
    angkatan: "",
    is_deleted: "true"
})

const getItems = computed(() => store.getItems)
const getGenerationFilter = computed(() => store.getGenerationFilter)
const getIsLoading = computed(() => store.getLoading);
const getIsOpen = computed(() => store.getIsOpen);


const getStudent = (payload) => {
    store.fetchStudent(payload)
}

const createStudent = async () => {
    await store.postStudent(form);
    getStudent({ angkatan: "", nameAngkatan: "", status: "" })
}

const getGeneration = (payload) => {
    store.fetchGeneration(payload)
}

const closeModal = () => {
    store.updateModal(false)
}


watch(status, (value) => {
    if (value == null) {
        getStudent({ angkatan: "", nameAngkatan: "", status: "" })
    } else {
        getStudent({ angkatan: "", nameAngkatan: "", status: value.code })
    }
});

watch(angkatan, (value) => {
    if (value == null) {
        getStudent({ angkatan: "", nameAngkatan: "", status: "" })
    } else {
        getStudent({ angkatan: value.code, nameAngkatan: "", status: status.value })
    }
});

onMounted(() => {
    getStudent({ angkatan: "", nameAngkatan: "", status: "" })
    getGeneration({ angkatan: "", nameAngkatan: "", status: "" })
});
</script>

<template>
    <div>
        <div class="w-full min-h-[80vh] py-8 px-8">
            <div class="flex mb-4 items-center gap-4">
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-sm leading-3 font-light">Angkatan</label>
                    <v-select :options="getGenerationFilter" value="code" label="label" v-model="angkatan"
                        class="text-xs leading-4"></v-select>
                </div>
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-sm leading-3 font-light">Status</label>
                    <v-select :options="statusItems" value="code" label="label" v-model="status"
                        class="text-xs leading-4"></v-select>
                </div>
                <div class="ml-auto mt-auto">
                    <Button @click="store.updateModal(true)">
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
                <div class="relative overflow-x-auto h-auto max-h-full hover:max-h-screen">
                    <Table :fields="fields">
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50 border-b" v-for="(item, index) in getItems">
                                <td class="py-4 leading-6">
                                    {{ index + 1 }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nama_mahasiswa }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.email }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.nomor_hp }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.angkatan }}
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
        <BaseModal :open="getIsOpen" @close="closeModal" :width="'w-[32vw]'">
            <form @submit.prevent="createStudent" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 space-x-3 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Nama Mahasiswa
                            </label>
                            <input v-model="form.nama_mahasiswa"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 space-x-3 w-auto min-w-[200px]">
                        <div class="w-full">
                            <label class="block text-xs font-light mb-2">
                                Email
                            </label>
                            <input v-model="form.email"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                No. Hp
                            </label>

                            <input v-model="form.nomor_hp"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Angkatan
                            </label>
                            <v-select :options="getGenerationFilter" label="label" v-model="form.angkatan"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md"></v-select>
                        </div>
                    </div>
                </div>
                <Button class="ml-auto mb-auto">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"
                            fill="#FFFFFF">
                            <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </svg>
                    </span>
                    <span
                        :class="getIsLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#4EBF5F] animate-spin' : ''">
                        {{ getIsLoading ? '' : 'New' }}
                    </span>
                </Button>
            </form>
        </BaseModal>
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