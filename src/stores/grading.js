import { defineStore } from 'pinia';
import { getShedule, updateGrading } from '../service/gradingService.js';
import { getSurah } from '../service/surahService.js';
import { swallAlert } from '../plugins/sweetalert2.js';

export const useGradingStore = defineStore('grading', {
    state: () => ({
        items: [],
        studentOption: [],
        surahOption: [],
        isOpen: false
    }),

    actions: {
        async fetchGrading(payload) {
            const res = await updateGrading(payload);
            if (res.response?.data?.status === 400) {
                swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },

        async fetchStudent(params) {
            const { data } = await getShedule(params);
            this.updateItemFilter(data);
        },

        async fetchSurah(params, { index, limit }) {
            const { data } = await getSurah(params);
            this.updateItemFilterSurah(data, index, limit);
        },

        updateItemFilter(results) {
            if (Array.isArray(results.data)) {
                this.studentOption = [];
                results.data.forEach(item => this.studentOption.push({ label: item.nama_mahasiswa, code: item.mahasiswa_id }));
            } else {
                console.error('Invalid input');
            }
        },

        updateItemFilterSurah(results, index, limit) {
            this.surahOption = []
            if (Array.isArray(results.data)) {
                let alKahfi = {
                    surah: "0",
                    nama_surah: "Al-Kahfi",
                    jumlah_ayat: "110",
                    arti_surahF: "Para Penghuni Gua",
                    juz_id: "",
                    seq: "0"
                };
                this.surahOption.push(alKahfi);
                for (let i = 0; i <= limit; i++) {
                    this.surahOption.push(results.data[i])
                };
            } else {
                console.error('Invalid input');
            }
        },

        clearGrading () {
            this.surahOption = []
        },

        updateItems(results) {
            this.items = results.data;
        },

        updateIsOpen(status) {
            this.isOpen = status;
        }
    },

    getters: {
        getItems: (state) => state.items,
        getStudentFilter: (state) => state.studentOption,
        getSurahFilter: (state) => state.surahOption,
        getIsOpen: (state) => state.isOpen,
    },
})
