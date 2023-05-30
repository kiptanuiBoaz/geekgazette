const BASE_URL = "https://geekgazette-server.onrender.com";
import axios, { AxiosInstance } from 'axios';

const axiosOptions ={
    baseURL: BASE_URL,
    withCredentials: true, // set withCredentials to true
    headers: {
        "Content-Type": "Application/json",
        withCredentials: true,
    }

}

//normal axios request
export const api: AxiosInstance = axios.create(axiosOptions);

// attached to req and res interceptors
export const privateApi: AxiosInstance = axios.create(axiosOptions);