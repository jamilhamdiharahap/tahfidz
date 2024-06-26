import instance from "../plugins/axios.js";


export async function getAngkatan({id, angkatan, nameAngkatan, status }) {
    try {
        const data = await instance.get(`/mahasiswa/getAngkatan?id=${id}&angkatan=${angkatan}&nama_angkatan=${nameAngkatan}&is_active=${status}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function postAngkatan(payload) {
    try {
        const data = await instance.post(`/mahasiswa/updateAngkatan`, payload);
        return data;
    } catch (err) {
        return err
    }
}

export async function updateStatusAngkatan(payload) {
    try {
        const data = await instance.post(`/mahasiswa/updateAngkatan`, payload);
        return data;
    } catch (err) {
        return err;
    }
}