import axios from 'axios';
import { StorageKeyEnum } from '../type/common';

const axiosInstanceWithAccessToken = axios.create({
    baseURL: 'https://api.goku.dev',
    timeout: 1000 * 15,
    headers: { Authorization: `Bearer ${localStorage.getItem(StorageKeyEnum.AccessToken)}` },
});

axiosInstanceWithAccessToken.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.status === 401) {
            localStorage.clear();
            window.location.reload();
        }
    }
);

export { axiosInstanceWithAccessToken };
