import { useDispatch } from "react-redux";
import { updateAuth } from "../api/authSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await api.get("/refresh", {
                withCredentials: true,
            });

            const user = { ...response?.data?._doc, }
            const accessToken = response.data.accessToken;
            dispatch(updateAuth({ ...user, accessToken }));

            return response.data.accessToken;

        } catch (error) {
            console.log(error);
            navigate("/auth/sign-in");
            return null;
        }
    }

    return refresh;
}

export default useRefreshToken;
