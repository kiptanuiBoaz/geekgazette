import { AuthState } from "./reduxTypes";

const storedUser = localStorage.getItem("user");
export const initialState: AuthState = storedUser ? JSON.parse(storedUser) : {
  user: {
    email: null, fname: '', lname: '', headTag: '', dob: '', accessToken: '', avatarUrl: null, roles: { User: 2001 },
  },
};