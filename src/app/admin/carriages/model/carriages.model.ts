export interface ICarriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

export type CarriagesResponse = ICarriage[];
