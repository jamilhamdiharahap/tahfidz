import { defineStore } from 'pinia';
import { getSurah } from '../service/surahService.js';

export const useSurahStore = defineStore('surah', {
    state: () => ({
        items: []
    }),

    actions: {
        async fetchSurah(params) {
            const { data } = await getSurah(params);
            this.updateItems(data)
        },
        updateItems(results) {
            this.items = results.data
        }
    },

    getters: {
        getItems: (state) => state.items,
    },
})
