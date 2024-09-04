import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Ride } from 'admin/ride/model/ride.model';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ ridesLoadingStatus: boolean }>());

export const retrieveRide = createAction('[Ride API] Retrieve Ride', props<{ id: string }>());

export const retrieveRideSuccess = createAction('[Ride API] Retrieve Ride Success', props<{ ride: Ride }>());

export const retrieveRideFailure = createAction('[Ride API] Retrieve Ride Failure', props<{ error: HttpErrorResponse }>());
