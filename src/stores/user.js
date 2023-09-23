import { defineStore } from 'pinia'
import {
    getUser,
    postUser
} from '../service/userService.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        items: [],
        isOpen: false,
        loading: false,
        message: "",
    }),

    actions: {
        async fetchUser(params) {
            const { data } = await getUser(params);
            this.updateItems(data)
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
        updateItems(results) {
            this.items = results.data
        },
        updateModal(status) {
            this.isOpen = status;
        }
    },

    getters: {
        getItems: (state) => state.items,
        getIsOpen: (state) => state.isOpen,
        getLoading: (state) => state.loading,
    },
})
