export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'admin' | 'lecturer' | 'student';
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LogActivityUser {
  id: string;
  userId:string;
  status: 'online' | 'offline';
  timeLogin: string;
  timeLogout: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginRequest {
  username: string;
  password: string;
}


