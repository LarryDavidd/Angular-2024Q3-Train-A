import { CarriagesResponse } from 'admin/carriages/model/carriages.model';

export interface CarriagesState {
  response: CarriagesResponse | null;
  loadingStatus: boolean;
}
