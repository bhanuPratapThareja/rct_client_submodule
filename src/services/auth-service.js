import axios from "axios"

export const setInterceptors = () => {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const newConfig = { ...config }
        const token = localStorage.getItem('token')

        if (token) {
            const headers = {
                ...newConfig.headers,
                'Authorization': token ? 'Bearer ' + token : ''
            }
            newConfig.headers = headers
        }
        // console.log('newConfig: ', newConfig)
        return newConfig;
    }, function (error) {
        // Do something with request error
        console.log('auth error: ', error)
        return Promise.reject(error);
    });

}