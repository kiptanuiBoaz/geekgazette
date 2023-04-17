import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// import redux auth state

interface InternalAxiosRequestConfig<T> extends AxiosRequestConfig<T> {
    sent?: boolean;
}

const usePrivateApi = () => {
    const refresh = useRefreshToken();
    //   acces selectors from reducx
    const auth = {};

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            (config: any) => {
                if (!config?.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: any) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(responseIntercept);
            axios.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return axios;
};

export default usePrivateApi;
