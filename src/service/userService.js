import instance from "../plugins/axios.js";


export async function getUser({ userId }) {
    try {
        const data = await instance.get(`/user/getUser?user_id=${userId}`);
        return data;
    } catch (err) {
        return err;
    }
}