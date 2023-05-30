import { PostInterface } from "../../api/reduxTypes";

export interface ProfileProps {
    scrollPos: number;
}

export interface PostsState {
    posts: { posts: PostInterface[]; }
}