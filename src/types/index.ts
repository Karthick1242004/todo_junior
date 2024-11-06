export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}