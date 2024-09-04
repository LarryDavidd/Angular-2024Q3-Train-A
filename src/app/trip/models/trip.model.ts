import { ScheduleSegment } from 'orders/models/order';

export interface Trip {
  rideId: number;
  routeId: number;
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

export interface RouteModalData {
  rideId: number;
  routeId: number;
  path: number[];
  segments: ScheduleSegment[];
}

export interface RouteEventItem {
  stationCity: string;
  departureTime?: string;
  arrivalTime?: string;
  icon?: string;
  color?: string;
  stop: string;
}

export type SeatStatusType = 'free' | 'occupied' | 'selected';
