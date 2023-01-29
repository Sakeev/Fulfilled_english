import axios from 'axios';
import { API } from '../helpers/consts';

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

// api.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         if (error.response.status === 401) {
//         }
//     }
// );

export default api;
