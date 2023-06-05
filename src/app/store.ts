import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../api/authSlice';
import postsReducer from '../api/postsSlice';
import navReducer from '../api/navSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    navState: navReducer,
  },
});

export default store;

store.subscribe(() => {
  localStorage.setItem("user", JSON.stringify(store.getState().auth));
});