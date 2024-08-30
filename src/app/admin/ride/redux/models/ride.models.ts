import { HttpErrorResponse } from '@angular/common/http';
import { Ride } from 'admin/ride/model/ride.model';

export interface RideState {
  ride: Ride | null;
  ridesLoadingStatus: boolean;
  error: HttpErrorResponse | null;
}
