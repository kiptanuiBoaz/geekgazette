import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: []
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const { id, ...updates } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...updates };
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId);
    }
  }
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
