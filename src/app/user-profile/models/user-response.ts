export interface UserResponse {
  name: string;
  email: string;
  role: 'manager' | 'user';
  message?: string;
  reason?: string;
}
