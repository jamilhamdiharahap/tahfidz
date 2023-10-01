<script setup>
import { onMounted, computed, ref, watch, reactive } from 'vue';
import Table from '@/components/Table.vue';
import { useGenerationStore } from '@/stores/generation.js';
import BaseModal from '@/components/BaseModal.vue';
import Button from '@/components/Button.vue';
import IconNotFound from '@/components/icons/iconNotFound.vue';

const store = useGenerationStore();

const fields = ref([
    "No",
    "Angkatan",
    "Nama Angkatan",
    "Status",
    "Action",
]);

const statusItems = ref([
    { label: "Active", code: true },
    { label: "Non Active", code: false },
]);

const status = ref("");

const form = reactive({
    id: "",
    angkatan: "",
    nama_angkatan: "",
    is_active: true
});

const payload = reactive({ id: "", angkatan: "", nameAngkatan: "", status: "" });

const getItemsActive = computed(() => store.getItemsActive);
const getIsLoading = computed(() => store.getLoading);
const getIsOpen = computed(() => store.getIsOpen);
const getIsOpenUpdate = computed(() => store.getIsOpenUpdate);
const getFormUpdate = computed(() => store.getFormUpdate);

const angkatan = computed(() => store.getAngkatan);
const nameAngkatan = computed(() => store.getNameAngkatan);

const formUpdate = reactive({
    id: "",
    angkatan: angkatan.value,
    nama_angkatan: nameAngkatan.value,
    is_active: true
});


const getGeneration = (payload) => {
    store.fetchGeneration(payload);
}

const closeModal = () => {
    store.updateModal(false);
    store.updateModal(false);
}

const editGradingById = (param) => {
    payload.id = param;
    store.fetchGenerationById(payload);
    store.modalShowUpdate(true);
}

const editGrading = () => {
    store.updateGeneration({
        id: getFormUpdate.value.id,
        angkatan: angkatan.value,
        nama_angkatan: nameAngkatan.value,
        is_active: true
    });

    angkatan.value = "";
    nameAngkatan.value = "";
}

const closeEditGrading = () => {
    store.modalShowUpdate(false);
}

const createAngkatan = async () => {
    await store.postGeneration(form);
    getGeneration();
}

watch(status, (value) => {
    if (value == null) {
        payload.status = "";
        getGeneration(payload);
    } else {
        payload.status = value?.code;
        getGeneration(payload);
    }
})

onMounted(() => {
    getGeneration(payload);
});
</script>

<template>
    <div>
        <div class="shadow-md rounded-md bg-slate-50 min-h-[70vh] py-8 px-8 w-full">
            <div class="flex mb-4 items-center">
                <div class="relative min-w-[16vw]">
                    <label for="" class="text-xs leading-3 font-light">Status</label>
                    <v-select :options="statusItems" value="code" label="label" v-model="status"
                        class="rounded-md text-xs"></v-select>
                </div>
                <div class="mt-auto ml-auto">
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
                <div class="relative overflow-x-auto h-auto max-h-full">
                    <Table v-if="getItemsActive.length > 0" :fields="fields">
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
                                    <button class="px-2" @click="editGradingById(item.id)">
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
        <BaseModal :open="getIsOpen" @close="closeModal" :width="'w-96'">
            <form @submit.prevent="createAngkatan()" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Angkatan
                            </label>
                            <input v-model="form.angkatan"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Nama Angkatan
                            </label>
                            <input v-model="form.nama_angkatan"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
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
                        {{ getIsLoading ? '' : 'New' }}
                    </span>
                </Button>
            </form>
        </BaseModal>
        <BaseModal :open="getIsOpenUpdate" @close="closeEditGrading" :width="'w-96'">
            <form @submit.prevent="editGrading()" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Angkatan
                            </label>
                            <input v-model="formUpdate.angkatan"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text" />
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Nama Angkatan
                            </label>
                            <input v-model="formUpdate.nama_angkatan"
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