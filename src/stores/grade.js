import { defineStore } from 'pinia';
import { getNilaiMaster, getNilai, updateGrade } from '../service/gradeService.js';
import { swallAlert } from '../plugins/sweetalert2.js';

export const useGradeStore = defineStore('grade', {
    state: () => ({
        items: [],
        nilaiItems: [],
        isOpen: false,
        loading: false,
    }),

    actions: {
        async fetchGrade(params) {
            const { data } = await getNilaiMaster(params);
            this.updateItems(data)
        },

        async fetchGradeMhs(params) {
            const { data } = await getNilai(params);
            this.updateItemsMhs(data)
        },

        async fetchUpdateGrade(payload) {
            this.loading = true;
            const res = await updateGrade(payload);
            if (res.response?.data?.status === 400) {
                this.updateModal(false);
                swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                this.loading = false;
                this.updateModal(false);
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },

        async fetchUpdateStatusGrade(payload) {
            this.loading = true;
            const res = await updateGrade(payload);
            if (res.response?.data?.status === 400) {
                this.updateModal(false);
            } else {
                this.loading = false;
                this.updateModal(false);
            }
        },

        updateItems(results) {
            this.items = []
            this.items = results.data;
        },

        updateItemsMhs(results) {
            this.nilaiItems = []
            this.nilaiItems = results.data;
        },

        updateModal(status) {
            this.isOpen = status;
        }
    },

    getters: {
        getItems: (state) => state.items,
        getItemMhs: (state) => state.nilaiItems,
        getIsOpen: (state) => state.isOpen,
        getLoading: (state) => state.loading,
    },
})
