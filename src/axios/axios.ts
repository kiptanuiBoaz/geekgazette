import axios from "axios";
const BASE_URL = "http://localhost:3500";


//set global baseurls
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    
})

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