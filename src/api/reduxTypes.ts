export interface User {
    email: string | null;
    fname: string;
    lname: string;
    headTag: string;
    dob: string;
    accessToken: string;
    avatarUrl: string | null;
    roles: {
      User: number;
    };
  }
  
 export interface AuthState {
    user: User;
  }