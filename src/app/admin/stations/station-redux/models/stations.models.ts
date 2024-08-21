import { GetStationsResponse } from 'admin/stations/model/station.model';

export interface StationsState {
  response: GetStationsResponse | null;
  loadingStatus: boolean;
}
