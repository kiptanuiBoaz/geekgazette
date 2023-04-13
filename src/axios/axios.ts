const BASE_URL = "http://localhost:3500";
import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true, // set withCredentials to true
  headers: {
    'Content-Type': 'application/json',
  },
});


//interceptors to be added
//attach jwt and retry incase of failure
// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//     headers:{
//         "Content-Type":"Application/json",
//         withCredentials: true,
//     }  
// })