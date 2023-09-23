import axios from "axios";


export async function loginAuthService(payload) {
    try {
        const data = await axios.post("http://localhost:8000/tugas-akhir/login", payload);
        return data;
    } catch (err) {
        return err;
    }
}