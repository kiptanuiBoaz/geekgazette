export interface User {
    email: string | null;
    fname: string  | null;
    lname: string  | null;
    headTag: string  | null;
    dob: string  | null;
    accessToken: string  | null;
    avatarUrl: string | null;
    roles: {
      User: number;
    } | null
  }
  
 export interface AuthState {
    user: User;
  }