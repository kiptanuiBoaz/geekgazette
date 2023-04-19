import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from 'react-redux';
import { privateApi } from "../axios/axios";


const usePrivateApi = () => {
    const refresh = useRefreshToken();
    const auth = useSelector((state: any) => state.auth);
    
    useEffect(() => {
        const requestIntercept = privateApi.interceptors.request.use(
            (config: any) => {
                if (!config?.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.user?.accessToken}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = privateApi.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: any) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return privateApi(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateApi.interceptors.response.eject(responseIntercept);
            privateApi.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return privateApi;
};

export default usePrivateApi;
