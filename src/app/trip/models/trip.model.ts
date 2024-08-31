export interface Trip {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}

interface Schedule {
  segments: Segment[];
}

interface Segment {
  time: string[];
  price: Record<string, number>;
  occupiedSeats: number[];
}

export interface Order {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
}

export interface OrderResponse {
  id: string;
}

export interface ModalData {
  errorMessage: string;
  suggestionMessage?: string;
  linkForRedirect?: string;
  errorSource?: string;
}

export type SeatStatusType = 'free' | 'occupied' | 'selected';
