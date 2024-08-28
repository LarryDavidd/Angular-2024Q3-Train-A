export interface Carriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

export interface AuthResponse {
  token: string;
}
