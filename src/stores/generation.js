import { defineStore } from 'pinia'
import { getAngkatan, postAngkatan } from '../service/generationService'

export const useGenerationStore = defineStore('generation', {
    state: () => ({
        itemsActive: [],
        loading: false,
        message: "",
        isOpen: false,
        isOpenUpdate: false,
        getItemById: null,
        nameAngkatan: "",
        angkatan: "",
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


        async fetchGenerationById(params) {
            const { data } = await getAngkatan(params);
            this.viewUpdate(data)
        },

        async updateGeneration(payload) {
            this.loading = true
            const { data, status, message } = await postAngkatan(payload);
            if (status == 200) {
                setTimeout(() => {
                    this.loading = false;
                    this.message = message;
                    this.modalShowUpdate(false)
                    this.angkatan = "";
                    this.nameAngkatan = "";
                }, 1000);
            } else {
                setTimeout(() => {
                    this.loading = false;
                    this.message = message;
                    this.modalShowUpdate(false);
                    this.angkatan = "";
                    this.nameAngkatan = "";
                }, 1000);
            }
        },

        updateModal(status) {
            this.isOpen = status;
        },

        viewUpdate(result) {
            this.getItemById = result.data[0].id
            this.angkatan = result.data[0].angkatan
            this.nameAngkatan = result.data[0].nama_angkatan
            
        },

        modalShowUpdate(status) {
            this.isOpenUpdate = status;
        },

        updateAngkatan(angkatan){
            this.angkatan = angkatan;
        },

        updateNameAngkatan(nameAngkatan){
            this.nameAngkatan = nameAngkatan;
        }

    },

    getters: {
        getItemsActive: (state) => state.itemsActive,
        getLoading: (state) => state.loading,
        getIsOpen: (state) => state.isOpen,
        getIsOpenUpdate: (state) => state.isOpenUpdate,
        getFormUpdate: (state) => state.getItemById,
        getNameAngkatan: (state) => state.nameAngkatan,
        getAngkatan: (state) => state.angkatan,
    },
})
