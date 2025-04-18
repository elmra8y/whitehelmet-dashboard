export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  message: string;
  status: string;
  user: User;
}

export interface User {
  id: number;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}
