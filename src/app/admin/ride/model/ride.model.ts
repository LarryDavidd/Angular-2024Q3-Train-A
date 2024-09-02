export interface ResponceBody {
  segment: Segment[];
  rideId: number;
}

export interface ResponceBodySave {
  segment: Segment[];
}

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

export interface RideUpdateRequest {
  segments: Segment[];
}

export interface ErrorResponse {
  error: {
    message: string;
    reason: string;
  };
}
