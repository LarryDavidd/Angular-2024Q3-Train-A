import { HttpErrorResponse } from '@angular/common/http';

export interface RideState {
  ride: Ride | null;
  ridesLoadingStatus: boolean;
  error: HttpErrorResponse | null;
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
