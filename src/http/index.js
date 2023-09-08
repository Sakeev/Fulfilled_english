import { API } from 'helpers/consts';
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: API,
});

api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.withCredentials = false;

    if (!token) return config;

    config.headers.Authorization = `Bearer ${token.access}`;

    return config;
});

export default api;
