import axios from "axios";

const $axios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000/',
});

$axios.interceptors.request.use(
    (config) => {
        // config.headers["Accept-Language"] = i18n.global.locale.value;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default $axios;
