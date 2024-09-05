interface ConnectedCity {
  id: number;
  distance: number;
}

export interface City {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedCity[];
}
