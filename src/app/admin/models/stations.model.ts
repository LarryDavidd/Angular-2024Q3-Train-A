export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: Connection[];
}

export interface CreatedStation {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export type Connection = {
  id: number;
  distance: number;
};

export interface StationCreateResponse {
  id: number;
}
