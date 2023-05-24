const BASE_URL = "https://geekgazette-server.onrender.com";
import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // set withCredentials to true
    headers: {
        "Content-Type": "Application/json",
        withCredentials: true,
    }

});


// interceptors to be added
// attach jwt and retry incase of failure
export const privateApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "Application/json",
        withCredentials: true,
    }
})