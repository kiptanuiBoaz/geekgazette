import { PostInterface } from "../../api/reduxTypes";

export interface PostsState {
    posts: { posts: PostInterface[]; }
  }