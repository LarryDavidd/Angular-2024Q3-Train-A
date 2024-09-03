// Stations
export interface IConnectedStation {
  id: number;
  distance: number;
}

export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnectedStation[];
}

export interface CreatedStation {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export type GetStationsResponse = Station[];

export interface StationCreateResponse {
  id: number;
}
