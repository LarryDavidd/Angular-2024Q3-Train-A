// Stations
export interface IConnectedStation {
  id: number;
  distance: number;
}

export interface IStation {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnectedStation[];
}

export type GetStationsResponse = IStation[];
