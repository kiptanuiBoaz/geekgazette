import { api } from "../axios/axios";
import { resetAuth } from '../api/authSlice';
import { useDispatch } from "react-redux";


const useLogout = (): (() => void) => {
    const dispatch = useDispatch();

    const logout = async (): Promise<void> => {
       dispatch(resetAuth());
        try {
            const response = await api.get("/logout", {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return logout;
};

export default useLogout;
