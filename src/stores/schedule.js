import { defineStore } from 'pinia';
import { deleteSchedule, getSchedule, updateSchedule } from '../service/scheduleService';
import { getMahasiswa } from '../service/studentService';

export const useScheduleStore = defineStore('schedule', {
    state: () => ({
        items: [],
        optionStudent: []
    }),

    actions: {
        async fetchSchedule(params) {
            const { data } = await getSchedule(params);
            this.updateItems(data)
        },

        async fetchUpdateSchedule(payload){
            const {data, status, message} = await updateSchedule(payload);
            console.log(data);
        },

        async fetchDeleteSchedule(payload){
            const {data, status, message} = await deleteSchedule(payload);
            console.log(data);
        },

        async fetchStudent(params) {
            const { data } = await getMahasiswa(params);
            this.updateItemFilterStudent(data)
        },

        updateItemFilterStudent(results) {
            if (Array.isArray(results.data)) {
                this.optionStudent = []
                results.data.forEach(item => this.optionStudent.push({ label: item.nama_mahasiswa , code: item.mahasiswa_id }));
            } else {
                console.error('Invalid input');
            }
        },

        updateItems(results) {
            this.items = results.data
        },
    },

    getters: {
        getItems: (state) => state.items,
        getStudent: (state) => state.optionStudent,
    },
})
