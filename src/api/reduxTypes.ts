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

export interface AuthState {
  user: User;
}


export interface PostInterface {
  imgUrl: string;
  title: string;
  category: string;
  authorEmail:string;
  body: string;
  email: string;
  date: string;
  _id:string;
  comments: {
    userId: string;
    date: string;
    text: string;
    _id:string;
  }[];
  likes: {
    userId: string;
    date: string;
  }[];
  author:{
    fname:string;
    lname:string;
    avatarUrl:string;
    headTag:string;
  }
}
