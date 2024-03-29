export interface User {
  email: string | null;
  fname: string | null;
  lname: string | null;
  headTag: string | null;
  dob: string | null;
  accessToken: string | null;
  avatarUrl: string | null;
  roles: {
    User: number;
  } | null
}

export interface PostsState {
  posts: PostInterface[];
}




export interface UpdateLikesPayload {
  postId: string | undefined;
  userEmail: string;
  date: string;
}
export interface DeleteCommentPayload {
  postId: string;
  commentId: string;
}

export interface AuthState {
  user: User;
}

export interface NewCommentPayload {
  postId: string | undefined;
  newComment: {
    date: string;
    text: string;
    userEmail: string;
    _id: string;
  };
};

export interface PostInterface {
  imgUrl: string;
  title: string;
  category: string;
  authorEmail: string;
  body: string;
  email: string;
  date: string;
  _id: string;
  comments: {
    userEmail: string;
    date: string;
    text: string;
    _id: string;
  }[];
  likes: {
    userEmail: string;
    date: string;
  }[];
  author: {
    fname: string;
    lname: string;
    avatarUrl: string;
    headTag: string;
  }
}

export interface SliceState {
  reading: boolean;
  openProfile: boolean;
  prevUrl:string;
}
