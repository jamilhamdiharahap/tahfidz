import { defineStore } from 'pinia'
import { getAngkatan, postAngkatan } from '../service/generationService'

export const useGenerationStore = defineStore('generation', {
    state: () => ({
        itemsActive: [],
        loading: false,
        message: "",
        isOpen: false
    }),

    actions: {
        async fetchGeneration(params) {
            const { data } = await getAngkatan(params);
            this.updateItems(data)
        },
        updateItems(results) {
            this.itemsActive = results.data
        },

        async postGeneration(payload) {
            this.loading = true
            const { data, status, message } = await postAngkatan(payload);
            if (status == 200) {
                setTimeout(() => {
                    this.loading = false;
                    this.message = message;
                    this.updateModal(false)
                }, 1000);
            } else {
                setTimeout(() => {
                    this.loading = false;
                    this.message = message;
                    this.updateModal(false)
                }, 1000);
            }
        },

        updateModal(status){
            this.isOpen = status;
        }

    },

    getters: {
        getItemsActive: (state) => state.itemsActive,
        getLoading: (state) => state.loading,
        getIsOpen: (state) => state.isOpen,
    },
})
