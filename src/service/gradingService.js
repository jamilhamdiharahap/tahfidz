import instance from "../plugins/axios.js";

export async function updateGrading(payload) {
    try {
        const data = await instance.post(`/nilai/updateNilai`, payload);
        return data;
    } catch (err) {
        return err;
    }
}

export async function getShedule(params) {
    try {
        const tanggal = new Date(params);
        const namaBulan = tanggal.getMonth() + 1
        const day = tanggal.getDate();
        const tahun = tanggal.getFullYear();
        const data = await instance.get(`/jadwal/getJadwal?jadwal_id=&day=${day}&month=${namaBulan}&year=${tahun}&mahasiswa_id=`);
        return data;
    } catch (err) {
        return err;
    }
}