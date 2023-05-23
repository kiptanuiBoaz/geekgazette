import { api } from "../axios/axios";
import { useDispatch } from 'react-redux';
import { updateAuth } from '../api/authSlice';
//import redux auth state

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await api.get("/refresh", {
            withCredentials: true,
        });

        const user = { ...response?.data?._doc, }
        const accessToken = response.data.accessToken;
        dispatch(updateAuth({ ...user, accessToken }));

        console.log(response.data.accessToken);
``
        return response.data.accessToken;
    };

    return refresh;
}

export default useRefreshToken;
