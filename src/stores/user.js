import { defineStore } from 'pinia'
import {
    getUser,
    postUser,
    deleteUser,
    putUser
} from '../service/userService.js';
import { swallAlert } from '../plugins/sweetalert2.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        items: [],
        itemUpdate: {},
        isOpen: false,
        loading: false,
        message: "",
        isOpenUpdate: false,
    }),

    actions: {
        async fetchUser(params) {
            const { data } = await getUser(params);
            if(params.flag){
                this.updateItems(data);
            }else{
                this.itemsUpdated(data);
                this.updateModalUpdate(true);
            }
        },
        async fetchCreateUser(payload) {
            this.loading = true;
            const { data, status, message } = await postUser(payload);
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

        async updateUser(payload) {
            this.loading = true;
            const res = await putUser(payload);
            if (res.response?.data?.status === 400) {
                this.loading = false;
                swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                this.loading = false;
                this.updateModalUpdate(false);
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },

        async fetchDeleteUser(username) {
            this.loading = true;
            const { status, message } = await deleteUser(username);
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

        updateItems(results) {
            this.items = results.data
        },
        updateModal(status) {
            this.isOpen = status;
        },

        itemsUpdated(results) {
            this.itemUpdate = results.data[0]
        },

        updateModalUpdate(status) {
            this.isOpenUpdate = status
        },
    },

    getters: {
        getItems: (state) => state.items,
        getItemsUpdated: (state) => state.itemUpdate,
        getIsOpen: (state) => state.isOpen,
        getLoading: (state) => state.loading,
        getIsOpenUpdate: (state) => state.isOpenUpdate,
    },
})
