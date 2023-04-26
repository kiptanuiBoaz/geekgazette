import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../api/authSlice';
import postsReducer from '../api/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;

store.subscribe(() => {
  localStorage.setItem("user", JSON.stringify(store.getState().auth.user));
});