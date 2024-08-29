import { createAction, props } from '@ngrx/store';
import { Ride } from '../models/ride.models';
import { HttpErrorResponse } from '@angular/common/http';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ ridesLoadingStatus: boolean }>());

export const retrieveRide = createAction('[Ride API] Retrieve Ride', props<{ id: string }>());

export const retrieveRideSuccess = createAction('[Ride API] Retrieve Ride Success', props<{ ride: Ride }>());

export const retrieveRideFailure = createAction('[Ride API] Retrieve Ride Failure', props<{ error: HttpErrorResponse }>());
