import { GetRoutesResponse } from 'admin/routes/model/routes.model';

export interface RoutesState {
  response: GetRoutesResponse | null;
  routesLoadingStatus: boolean;
}
