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
