import { Segment } from './search-response.model';

export interface Routes {
  startDate: Date;
  endDate: Date;
  duration: Date;
  path: number[];
  rideId: number;
  routeId: number;
  segments: Segment[];
}
// соберем тип данных для поездки
