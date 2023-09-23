import instance from "../plugins/axios.js";


export async function getNilaiMaster({ nilaiId, status }) {
    try {
        const data = await instance.get(`/nilai/getMasterNilai?nilai_id=${nilaiId}&is_active=${status}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function getNilai({ surahId, tanggal, mahasiswaId }) {
    try {
        const data = await instance.get(`/nilai/getNilai?surah_id=${surahId}&tanggal=${tanggal}&mahasiswa_id=${mahasiswaId}`);
        return data;
    } catch (err) {
        return err;
    }
}