export interface Segment {
  time: [string, string];
  price: {
    [key: string]: number;
  };
}

export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface Ride {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}
