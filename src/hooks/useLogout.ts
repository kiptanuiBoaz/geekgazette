import { api } from "../axios/axios";
import { resetAuth } from '../api/authSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const useLogout = (): (() => void) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        try {
            const response = await api.get("/logout", {
                withCredentials: true
            });

            window.localStorage.removeItem("user");
            dispatch(resetAuth());
            navigate("/auth/sign-in");
        } catch (error) {
            console.error(error);
        }
    };

    return logout;
};

export default useLogout;
