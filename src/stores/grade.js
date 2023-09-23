import { defineStore } from 'pinia';
import { getNilaiMaster, getNilai } from '../service/gradeService.js';

export const useGradeStore = defineStore('grade', {
    state: () => ({
        items: [],
        nilaiItems: []
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

        updateItems(results) {
            this.items = results.data
        },

        updateItemsMhs(results){
            this.items = results.data
        }
    },

    getters: {
        getItems: (state) => state.items,
        getItemMhs: (state) => state.nilaiItems,
    },
})
