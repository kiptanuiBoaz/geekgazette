import axios from "../api/axios";
//import redux auth state

const useRefreshToken = () => {
    // const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get<{ roles: string[], accessToken: string }>("/refresh", {
            withCredentials: true,
        });

        setAuth((prev:any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            })
        })

        return response.data.accessToken;
    };

    return refresh;
}

export default useRefreshToken;
