import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/tugas-akhir',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

instance.interceptors.request.use(
    function (config) {
        const token = JSON.parse(localStorage.getItem('auth'));
        if (token[0]) {
            config.headers["Authorization"] = `Bearer ${token[0]}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;