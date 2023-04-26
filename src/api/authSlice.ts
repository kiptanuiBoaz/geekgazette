import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from "./reduxTypes";

const storedUser = localStorage.getItem("user");
const initialState: AuthState = storedUser ? JSON.parse(storedUser) : {
  user:{
    email: null, fname: '', lname: '', headTag: '', dob: '', accessToken: '', avatarUrl: null, roles: { User: 2001 },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<User>) => {
      const { email, fname, lname, accessToken, avatarUrl, dob, headTag, roles } = action.payload;
      state.user.dob = dob || state.user.dob;
      state.user.headTag = headTag || state.user.headTag;
      state.user.roles = roles || state.user.roles;
      state.user.email = email || state.user.email;
      state.user.fname = fname || state.user.fname;
      state.user.lname = lname || state.user.lname;
      state.user.accessToken = accessToken || state.user.accessToken;
      state.user.avatarUrl = avatarUrl || state.user.avatarUrl;
      localStorage.setItem("user", JSON.stringify(state)); // store updated state in the local storage
    },
    resetAuth: (state) => {
      state.user = initialState.user;
      localStorage.removeItem("user"); // remove the user from the local storage
    },
  },
});

export const { updateAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
