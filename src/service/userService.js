import instance from "../plugins/axios.js";


export async function getUser({ userId }) {
    try {
        const data = await instance.get(`/user/getUser?user_id=${userId}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function postUser(payload) {
    try {
        const data = await instance.post(`/user/create`, payload);
        return data;
    } catch (err) {
        return err;
    }
}

export async function deleteUser(username) {
    try {
        const data = await instance.post(`/user/delete?user_name=${username}`);
        return data;
    } catch (err) {
        return err;
    }
}