<script setup>
import { onMounted, computed, ref, reactive } from 'vue';
import { useScheduleStore } from '@/stores/schedule';
import BaseModal from '../../../components/BaseModal.vue';

const store = useScheduleStore();

const getItems = computed(() => store.getItems);
const getStudent = computed(() => store.getStudent);
const listItem = ref([]);
const title = ref("");
const currentDate = reactive(new Date())



const isOpen = ref(false)
const mahasiswa = ref('')

const form = reactive({
    jadwal_id: "",
    waktu: "",
    mahasiswa_id: [],
    is_deleted: ""
})

const formatDate = (value) => {
    const tanggal = new Date(value);
    const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(tanggal);
    const day = tanggal.getDate();
    const tahun = tanggal.getFullYear();

    return `${day} ${namaBulan}, ${tahun}`;
}

const helperDate = (day) => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getUTCFullYear();

    return `${year}-${month}-${day}`
}

const formatterDate = (date) => {
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const today = new Date(date);
    const month = today.getMonth() + 1;
    const year = today.getUTCFullYear();

    return `${months[month - 1]} - ${year}`
}

const openModal = (params) => {
    store.fetchStudent({ angkatan: "", nameAngkatan: "", status: "true" })
    isOpen.value = true
    title.value = formatDate(helperDate(params.tanggal))
    form.waktu = helperDate(params.tanggal)
}

const handleList = () => {
    const newMahasiswa = mahasiswa.value;
    const isDuplicate = listItem.value.some(item => item.code === newMahasiswa.code);

    if (!isDuplicate) {
        listItem.value.push(newMahasiswa);
    }

    mahasiswa.value = '';
};

const removeList = (code) => {
    listItem.value = listItem.value.filter((item) => item.code !== code);
};

const closeModal = () => {
    listItem.value = []
    mahasiswa.value = ''
    isOpen.value = false;
}

const getCellClasses = (item) => {
    const classes = [
        'border',
        'p-1',
        'h-60',
        'xl:w-40',
        'lg:w-30',
        'md:w-30',
        'sm:w-20',
        'w-10',
        'overflow-hidden',
        'transition',
        'cursor-pointer',
        'duration-500',
        'ease',
        'hover:bg-gray-300',
    ];

    if (item.flag === 'DISABLE') {
        classes.push('bg-gray-300 opacity-40');
    } else if (item.flag === 'ACTIVE') {
        classes.push('bg-[#A1DD70]');
    }

    return classes.join(' ');
}

const getTextClasses = (item) => {
    const classes = ['text-gray-500'];

    if (item.active) {
        classes.push('text-xs');
    } else {
        classes.push('text-sm')
    }

    return classes.join(' ');
}

const getSchedule = () => {
    store.fetchSchedule(currentDate)
}

const previousMonth = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    getSchedule()
}

const nextMonth = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    getSchedule()
}

const createSchedule = async () => {
    listItem.value.forEach(item => {
        form.mahasiswa_id.push(item.code)
    })
    await store.fetchUpdateSchedule(form);

    closeModal();
    getSchedule();
}

const deleteSchedule = async (params) => {
    await store.fetchDeleteSchedule({
        jadwal_id: params,
        waktu: "",
        mahasiswa_id: "",
        is_deleted: "1"
    })
    getSchedule()
}

onMounted(() => {
    getSchedule()
})
</script>

<template>
    <div>
        <div class="flex space-x-4 py-4">
            <button @click="previousMonth">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
            </button>
            <h2>{{ formatterDate(currentDate) }}</h2>
            <button @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
            </button>
        </div>
        <div class="grid grid-cols-7">
            <template v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']">
                <div class="text-center h-10 text-sm leading-5">{{ day }}</div>
            </template>
            <div v-for="(item, index) in getItems" :key="index" :class="getCellClasses(item)">
                <div class="flex flex-col h-40 xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto">
                    <div class="top h-5 w-full flex justify-between">
                        <span :class="getTextClasses(item)">{{ item.tanggal }}</span>
                    </div>
                    <div class="bottom flex-grow h-30 py-2 w-full cursor-pointer">
                        <div class="overflow-y-hidden block space-y-1">
                            <div class="relative" v-for="(student, index) in item.listMahasiswa">
                                <p class="text-xs font-light leading-3 px-0.5 rounded-md">{{ student.nama_mahasiswa }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseModal :open="isOpen" @close="closeModal" :width="'w-[32vw]'">
            <div class="py-4">
                <span class="text-sm leading-5">
                    JADWAL HAFALAN ({{ title }})
                </span>
            </div>
            <div class="flex flex-col md:gap-4">
                <div class="relative">
                    <div>
                        <label class="block text-xs font-light mb-2">
                            Nama Mahasiswa
                        </label>
                        <div class="flex items-center justify-between space-x-3">
                            <div class="w-full min-w-[200px]">
                                <v-select :clearable="false" :options="getStudent" label="label" v-model="mahasiswa"
                                    class="style-chooser text-xs leading-4"></v-select>
                            </div>
                            <div>
                                <button :disabled="mahasiswa.length == 0" @click="handleList"
                                    class="rounded-md mt-auto px-2 py-1 gap-1 bg-base bg-[#0097B1]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="24"
                                        viewBox="0 -960 960 960" width="24">
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap space-x-2 pb-8 pt-2" v-if="listItem.length > 0">
                <div v-for="item in listItem" :key="item.id"
                    class="flex items-center bg-[#0097B1] relative px-4 py-1 rounded-xl">
                    <span class="text-xs text-white">
                        {{ item.label }}
                    </span>
                    <button class="absolute bg-gray-500 right-0 rounded-full -top-1 text-xs" @click="removeList(item.code)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="12" viewBox="0 -960 960 960"
                            width="12">
                            <path
                                d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div :class="listItem.length > 0 ? '' : 'hidden'">
                <button @click="createSchedule" class="rounded-md px-2 py-1 bg-base w-full bg-[#9EB23B] text-center">
                    <span class="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#FFFFFF" viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.615q-49.5 0-84.75-35.25T240-624.615q0-49.501 35.25-84.751 35.25-35.25 84.75-35.25t84.75 35.25Q480-674.116 480-624.615q0 49.5-35.25 84.75T360-504.615ZM80-215.384v-65.847Q80-306 94.423-327.577q14.423-21.577 38.808-33.5 56.615-27.154 113.307-40.731Q303.231-415.385 360-415.385q56.769 0 113.462 13.577 56.692 13.577 113.307 40.731 24.385 11.923 38.808 33.5Q640-306 640-281.231v65.847H80Zm40-40.001h480v-25.846q0-13.307-8.577-25-8.577-11.692-23.731-19.769-49.384-23.923-101.836-36.654Q413.405-375.385 360-375.385q-53.405 0-105.856 12.731Q201.692-349.923 152.308-326q-15.154 8.077-23.731 19.769-8.577 11.693-8.577 25v25.846Zm240-289.23q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.23Z" />
                        </svg>
                    </span>
                </button>
            </div>
        </BaseModal>
    </div>
</template>