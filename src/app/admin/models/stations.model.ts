export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: Connection[];
}

type Connection = {
  id: number;
  distance: number;
};
