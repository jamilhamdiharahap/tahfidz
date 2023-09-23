import { defineStore } from 'pinia'
import { getUser } from '../service/userService.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        items: []
    }),

    actions: {
        async fetchUser(params) {
            const { data } = await getUser(params);
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
