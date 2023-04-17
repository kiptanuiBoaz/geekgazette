import { api } from "../axios/axios";
import { useDispatch } from 'react-redux';
import { updateAuth } from '../api/authSlice';
//import redux auth state

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await api.get<{ roles: any, accessToken: string }>("/refresh", {
            withCredentials: true,
        });

        dispatch(updateAuth({ accessToken: response.data.accessToken }))

        console.log(response.data.accessToken);

        return response.data.accessToken;
    };

    return refresh;
}

export default useRefreshToken;
