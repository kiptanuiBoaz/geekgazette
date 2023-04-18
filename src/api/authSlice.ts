import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: "",
    fname: "",
    lname: "",
    headTag:"",
    dob:"",
    accessToken: "",
    avatarUrl: null,
    roles:{User:2000}
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      const { email, fname, lname, accessToken, avatarUrl,dob,headTag,roles } = action.payload;
      state.user.dob = dob || state.user.dob;
      state.user.headTag = headTag || state.user.headTag;
      state.user.roles = roles || state.user.roles;
      state.user.email = email || state.user.email;
      state.user.fname = fname || state.user.fname;
      state.user.lname = lname || state.user.lname;
      state.user.accessToken = accessToken || state.user.accessToken;
      state.user.avatarUrl = avatarUrl || state.user.avatarUrl;
    }
  }
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
