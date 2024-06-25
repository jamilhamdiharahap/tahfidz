import { defineStore } from 'pinia'
import { getAngkatan, postAngkatan } from '../service/generationService'
import { swallAlert } from '../plugins/sweetalert2';
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
        isActive: null,
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
            const res = await postAngkatan(payload);
            if (res.response?.data?.status === 400) {
                this.loading = false;
                // this.updateModal(false)
                swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                this.loading = false;
                this.updateModal(false)
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },


        async fetchGenerationById(params) {
            const { data } = await getAngkatan(params);
            this.viewUpdate(data)
        },

        async updateGeneration(payload) {
            this.loading = true
            const res = await postAngkatan(payload);
            if (res.response?.data?.status === 400) {
                this.loading = false;
                swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                this.loading = false;
                this.modalShowUpdate(false);
                this.angkatan = "";
                this.nameAngkatan = "";
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },

        async updateModal(status) {
            this.isOpen = status;
            // return true
        },

        viewUpdate(result) {
            this.getItemById = result.data[0].id
            this.angkatan = result.data[0].angkatan
            this.nameAngkatan = result.data[0].nama_angkatan
            this.isActive = Boolean(result.data[0].is_active)
        },

        modalShowUpdate(status) {
            this.isOpenUpdate = status;
        },

        updateAngkatan(angkatan){
            this.angkatan = angkatan;
        },

        updateNameAngkatan(nameAngkatan){
            this.nameAngkatan = nameAngkatan;
        },

        updateIsActive(status){
            console.log(status)
            this.isActive = status;
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
        getIsActive: (state) => state.isActive,
    },
})
