import { defineStore } from 'pinia';
import { getNilaiMaster, getNilai, updateGrade } from '../service/gradeService.js';

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
            const { data, status } = await updateGrade(payload);
            if (status == 200) {
                setTimeout(() => {
                    this.loading = false;
                    this.updateModal(false);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.loading = false;
                    this.updateModal(false);
                }, 1000);
            }
        },

        updateItems(results) {
            this.items = results.data;
        },

        updateItemsMhs(results) {
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
