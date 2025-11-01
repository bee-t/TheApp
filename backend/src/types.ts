export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<User, 'password'>;
}