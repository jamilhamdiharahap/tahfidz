import instance from "../plugins/axios.js";


export async function getSchedule(params) {
    try {
        const month = params.getMonth() + 1
        const year = params.getUTCFullYear();
        const data = await instance.get(`/buildtanggal?bulan=${month}&tahun=${year}`);
        
        return data;
    } catch (err) {
        return err;
    }
}

export async function updateSchedule(payload) {
    try {
        const data = await instance.post(`/jadwal/updateJadwalList`, payload);
        return data;
    } catch (err) {
        return err;
    }
}

export async function deleteSchedule(payload) {
    try {
        const data = await instance.post(`/jadwal/updateJadwal`, payload);
        return data;
    } catch (err) {
        return err;
    }
}