import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RideService } from 'admin/ride/services/ride.service';
import * as RideActions from '../actions/ride.actions';

@Injectable()
export class RideEffects {
  constructor(
    private actions$: Actions,
    private rideService: RideService
  ) {}

  setLoadingStatusTrue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RideActions.retrieveRide),
      map(() => RideActions.changeLoadingStatus({ ridesLoadingStatus: true }))
    );
  });

  setLoadingStatusFalse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RideActions.retrieveRideSuccess, RideActions.retrieveRideFailure),
      map(() => RideActions.changeLoadingStatus({ ridesLoadingStatus: false }))
    );
  });

  retrieveRide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RideActions.retrieveRide),
      mergeMap((action) =>
        this.rideService.getRideById(action.id).pipe(
          map((ride) => RideActions.retrieveRideSuccess({ ride })),
          catchError((error) => of(RideActions.retrieveRideFailure({ error })))
        )
      )
    )
  );
}
