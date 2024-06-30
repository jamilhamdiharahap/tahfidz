import { defineStore } from 'pinia'
import { getMahasiswa, postMahasiswa, updateStatusMahasiswa } from '../service/studentService.js';
import { getAngkatan } from '../service/generationService.js';
import { swallAlert } from '../plugins/sweetalert2.js';

export const useStudentStore = defineStore('student', {
    state: () => ({
        items: [],
        generation_option: [],
        student_option: [],
        loading: false,
        message: "",
        isOpen: false,
        isOpenUpdate: false,
        payloadUpdate: {
            mahasiswa_id: "",
            nama_mahasiswa: "",
            email: "",
            nomor_hp: "",
            is_active: "",
            angkatan: "",
            is_deleted: ""
        }
    }),

    actions: {
        async fetchStudent(params) {
            const { data } = await getMahasiswa(params);
            console.log(params.flag)
            if (params.flag) {
                this.updateItems(data);
                this.updateItemStudentFilter(data);
            } else {
                this.payloadUpdate.nama_mahasiswa = data?.data[0].nama_mahasiswa;
                this.payloadUpdate.email = data?.data[0].email;
                this.payloadUpdate.nomor_hp = data?.data[0].nomor_hp;
                this.payloadUpdate.angkatan = data?.data[0].angkatan;
                this.payloadUpdate.is_active = data?.data[0].is_active;
                this.payloadUpdate.is_deleted = data?.data[0].is_deleted;
                this.updateModalUpdate(true);
            }
        },

        async fetchGeneration(params) {
            const { data } = await getAngkatan(params);
            this.updateItemFilter(data)
        },

        updateItemFilter(results) {
            if (Array.isArray(results.data)) {
                this.generation_option = []
                results.data.forEach(item => this.generation_option.push({ label: item.angkatan, code: item.angkatan }));
            } else {
                console.error('Invalid input');
            }
        },

        updateItemStudentFilter(results) {
            if (Array.isArray(results.data)) {
                this.student_option = []
                results.data.forEach(item => this.student_option.push({ label: item.nama_mahasiswa, code: item.mahasiswa_id }));
            } else {
                console.error('Invalid input');
            }
        },

        async fetchUpdateStatusMahasiswa(payload) {
            this.loading = true;
            const res = await updateStatusMahasiswa(payload);
            if (res.response?.data?.status === 400) {
                this.loading = false;
            } else {
                this.loading = false;
                this.updateModal(false)
            }
        },

        async fetchUpdateMahasiswa(payload) {
            this.loading = true;
            const res = await updateStatusMahasiswa(payload);
            if (res.response?.data?.status === 400) {
                this.loading = false;
                // swallAlert('danger', 'error', { btnOk: 'Ok', message: res.response.data.message, title: 'Error' })
            } else {
                this.loading = false;
                this.updateModalUpdate(false);
                swallAlert('success', 'success', { btnOk: 'Ok', message: res.data.message, title: res.data.message })
            }
        },

        updateItems(results) {
            this.items = results.data
        },

        async postStudent(params) {
            this.loading = true
            let payload = {
                mahasiswa_id: "",
                nama_mahasiswa: params.nama_mahasiswa,
                email: params.email,
                nomor_hp: params.nomor_hp,
                is_active: true,
                angkatan: params.angkatan.code,
                is_deleted: true
            }
            const { data, status, message } = await postMahasiswa(payload);
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

        updateModal(status) {
            this.isOpen = status;
        },


        updateModalUpdate(status) {
            this.isOpenUpdate = status
        },
    },

    getters: {
        getItems: (state) => state.items,
        getGenerationFilter: (state) => state.generation_option,
        getStudentFilter: (state) => state.student_option,
        getLoading: (state) => state.loading,
        getIsOpen: (state) => state.isOpen,
        getIsOpenUpdate: (state) => state.isOpenUpdate,
    },
})
