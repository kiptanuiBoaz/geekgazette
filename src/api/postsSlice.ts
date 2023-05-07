import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInterface ,NewCommentPayload,DeleteCommentPayload} from './reduxTypes';

interface PostsState {
  posts: PostInterface[];
}


const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostInterface>) => {
      state.posts.push(action.payload);
    },

    updatePost: (state, action: PayloadAction<PostInterface>) => {
      const { _id, ...updates } = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === _id);
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...updates };
      }
    },

    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post._id !== postId);
    },

    setPosts: (state, action: PayloadAction<PostInterface[]>) => {
      state.posts = action.payload;
    },

    addComment: (state, action: PayloadAction<NewCommentPayload>) => {
      const { postId, newComment } = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push(newComment);
      }
    },

    deleteComment: (state, action: PayloadAction<DeleteCommentPayload>) => {
      const { postId, commentId } = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments = state.posts[postIndex].comments.filter(comment => comment._id !== commentId);
      }
    },
  }
});

export const { addPost, updatePost, deletePost, setPosts,addComment, deleteComment} = postsSlice.actions;
export default postsSlice.reducer;
