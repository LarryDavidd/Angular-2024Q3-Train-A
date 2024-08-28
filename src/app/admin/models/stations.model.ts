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

type Connection = {
  id: number;
  distance: number;
};
