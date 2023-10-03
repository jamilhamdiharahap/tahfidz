import { defineStore } from 'pinia'
import {
    getUser,
    postUser,
    deleteUser
} from '../service/userService.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        items: [],
        isOpen: false,
        loading: false,
        message: "",
        isOpenUpdate: false,
        updateUser: {
            user_name: "",
            user_password: "",
            user_active: true,
            role_id: 0,
            mail: "",
            full_name: "",
            phone: ""
        }
    }),

    actions: {
        async fetchUser(params) {
            const { data } = await getUser(params);
            if(params.flag){
                this.updateItems(data);
            }else{
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

        async fetchDeleteUser(username) {
            this.loading = true;
            const { data, status, message } = await deleteUser(username);
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

        updateModalUpdate(status) {
            this.isOpenUpdate = status
        },
    },

    getters: {
        getItems: (state) => state.items,
        getIsOpen: (state) => state.isOpen,
        getLoading: (state) => state.loading,
        getIsOpenUpdate: (state) => state.isOpenUpdate,
    },
})
