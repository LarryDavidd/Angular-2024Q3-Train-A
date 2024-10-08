interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface StationData {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}

export interface Segment {
  time: [string, string];
  price: {
    [carriageType: string]: number;
  };
  occupiedSeats: number[];
}

interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface Route {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export interface SearchResponse {
  from: StationData;
  to: StationData;
  routes: Route[];
}
