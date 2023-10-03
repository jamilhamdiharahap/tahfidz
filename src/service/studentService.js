import instance from "../plugins/axios.js";


export async function getMahasiswa({ mahasiswaId, angkatan, nameAngkatan, status }) {
    try {
        const data = await instance.get(`/mahasiswa/getMahasiswa?angkatan=${angkatan}&mahasiswa_id=${mahasiswaId}&nama_mahasiswa=${nameAngkatan}&is_active=${status}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function postMahasiswa(payload) {
    try {
        const data = await instance.post(`/mahasiswa/updateMahasiswa`, payload);
        return data;
    } catch (err) {
        return err;
    }
}