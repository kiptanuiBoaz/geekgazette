import { PostInterface } from "../../api/reduxTypes";

export interface PostsStateInterface {
    posts: { posts: PostInterface[]; }
}