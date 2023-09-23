import instance from "../plugins/axios.js";


export async function getSurah({ surah, seq, mahasiswaId }) {
    try {
        const data = await instance.get(`/surah/getSurah?surah=${surah}&seq=${seq}&mahasiswa_id=${mahasiswaId}`);
        return data;
    } catch (err) {
        return err;
    }
}