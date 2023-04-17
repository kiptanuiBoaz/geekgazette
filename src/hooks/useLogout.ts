import {api} from "../axios/axios";
// import redux auth state 


const useLogout = (): (() => void) => {
    //update auth state to empty

    const logout = async (): Promise<void> => {
        // empty out the current auth state

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
