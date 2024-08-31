export const enum OrderStatus {
  Active = 'active',
  Canceled = 'canceled',
  Completed = 'completed',
  Rejected = 'rejected'
}

export interface ScheduleSegment {
  time: [departureFromPrevStation: string, arrivalAtNextStation: string];
  price: Record<string, number>;
}

export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: OrderStatus;
  path: number[];
  carriages: string[];
  schedule: {
    segments: ScheduleSegment[];
  };
}
