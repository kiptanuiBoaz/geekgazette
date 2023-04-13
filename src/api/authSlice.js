import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: "",
    fname: "",
    lname: "",
    accessToken: "",
    avatarUrl: "",
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      const { email, fname, lname, accessToken, avatarUrl } = action.payload;
      state.user.email = email || state.user.email;
      state.user.fname = fname || state.user.fname;
      state.user.lname = lname || state.user.lname;
      state.user.accessToken = accessToken || state.user.accessToken;
      state.auth.avatarUrl = avatarUrl || state.auth.avatarUrl;
    }
  }
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;