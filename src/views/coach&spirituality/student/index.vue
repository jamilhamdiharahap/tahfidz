<script setup>
import { onMounted, computed, ref, watch, reactive } from 'vue';
import Table from '@/components/Table.vue';
import { useStudentStore } from '@/stores/student';
import BaseModal from '@/components/BaseModal.vue';
import Button from '@/components/Button.vue';
import IconNotFound from '@/components/icons/iconNotFound.vue';

const store = useStudentStore();

const fields = ref([
    "No",
    "Nama Mahasiswa",
    "Email",
    "No. HP",
    "Angkatan",
    "Nama Angkatan",
    "status",
    "Action",
]);

const statusItems = ref([
    { label: "Aktif", code: true },
    { label: "Tidak Aktif", code: false },
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
});

const payload = reactive({ id: "", angkatan: "", nameAngkatan: "", status: "" });
const payloadStudent = reactive({ mahasiswaId: "", angkatan: "", nameAngkatan: "", status: "", flag: true, jadwal: "" });

const updateStudent = reactive({
    payload: computed(() => store.payloadUpdate)
});


const getItems = computed(() => store.getItems)
const getGenerationFilter = computed(() => store.getGenerationFilter)
const getIsLoading = computed(() => store.getLoading);
const getIsOpen = computed(() => store.getIsOpen);
const getIsOpenUpdate = computed(() => store.getIsOpenUpdate);


const getStudent = () => {
    store.fetchStudent(payloadStudent)
}

const createStudent = async () => {
    await store.postStudent(form);
    getStudent()
}

const getGeneration = () => {
    store.fetchGeneration(payload)
}

const closeModal = () => {
    store.updateModal(false)
}

const getStudentEditById = (paramId) => {
    payloadStudent.mahasiswaId = paramId;
    payloadStudent.flag = false;
    getStudent();
}

const handleUpdateStatus = async (params) => {
    params.is_active = params.is_active == 'true' ? false : true 
    await store.fetchUpdateStatusMahasiswa(params)
    getStudent()
}

function updatePayloadAndGetData(value, property) {
    if (value == null) {
        payloadStudent[property] = "";
    } else {
        payloadStudent[property] = value.code;
    }
    getStudent();
}

watch(status, (value) => {
    updatePayloadAndGetData(value, "status");
});

watch(angkatan, (value) => {
    updatePayloadAndGetData(value, "angkatan");
});

onMounted(() => {
    getStudent();
    getGeneration();
});
</script>

<template>
    <div>
        <div class="shadow-md rounded-md bg-slate-50 w-full px-8">
            <div class="flex mb-4 items-center gap-4 py-6">
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
                <div class="relative overflow-x-auto max-h-[62vh]">
                    <Table v-if="getItems.length > 0" :fields="fields">
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
                                    {{ item.nama_angkatan }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.is_active === 'true' ? 'Aktif' : 'Tidak Aktif' }}
                                </td>
                                <td class="py-4 leading-6">
                                    <button @click="getStudentEditById(item.mahasiswa_id)" class="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E9B824" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l113-113 169 169-112 112ZM120-120v-170l424-424 170 170-424 424H120Zm453-453-28-28 56 56-28-28Z" />
                                        </svg>
                                    </button>
                                    <button class="px-2" @click="handleUpdateStatus(item)">
                                        <svg v-if="item.is_active == 'true'" xmlns="http://www.w3.org/2000/svg"
                                            fill="#4EBF5F" height="24" viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M280-260.001q-91.666 0-155.832-64.14-64.167-64.14-64.167-155.768 0-91.629 64.167-155.859Q188.334-699.999 280-699.999h400q91.666 0 155.832 64.14 64.167 64.14 64.167 155.768 0 91.629-64.167 155.859Q771.666-260.001 680-260.001H280ZM280-320h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm399.955-50.001q45.814 0 77.929-32.07t32.115-77.884q0-45.814-32.07-77.929t-77.884-32.115q-45.814 0-77.929 32.07t-32.115 77.884q0 45.814 32.07 77.929t77.884 32.115ZM480-480Z" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="#C63D2F" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M280-260.001q-91.666 0-155.832-64.14-64.167-64.14-64.167-155.768 0-91.629 64.167-155.859Q188.334-699.999 280-699.999h400q91.666 0 155.832 64.14 64.167 64.14 64.167 155.768 0 91.629-64.167 155.859Q771.666-260.001 680-260.001H280ZM280-320h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-.045-50.001q45.814 0 77.929-32.07t32.115-77.884q0-45.814-32.07-77.929t-77.884-32.115q-45.814 0-77.929 32.07t-32.115 77.884q0 45.814 32.07 77.929t77.884 32.115ZM480-480Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table v-else :fields="fields">
                        <tbody class="pt-4 h-60">
                            <tr class="w-full h-full">
                                <td class="relative" :colspan="fields.length">
                                    <div class="absolute inset-0 flex justify-center items-center">
                                        <IconNotFound />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        <BaseModal :open="getIsOpen" @close="closeModal" :width="'w-[32vw]'" :notClose="'ok'">
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
        <BaseModal :open="getIsOpenUpdate" @close="store.updateModalUpdate(false)" :width="'w-96'">
            <form @submit.prevent="" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Nama Mahasiswa
                            </label>
                            <input v-model="updateStudent.payload.nama_mahasiswa"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text" />
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Email
                            </label>
                            <input v-model="updateStudent.payload.email"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text" />
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Angkatan
                            </label>
                            <input v-model="updateStudent.payload.angkatan"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text" />
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                No. Hp
                            </label>
                            <input v-model="updateStudent.payload.nomor_hp"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text" />
                        </div>
                    </div>
                </div>
                <Button class="m-auto ml-auto">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"
                            fill="#FFFFFF">
                            <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </svg>
                    </span>
                    <span
                        :class="getIsLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#4EBF5F] animate-spin' : ''">
                        {{ getIsLoading ? '' : 'Save' }}
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