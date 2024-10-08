import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import * as StationsActions from '../actions/stations.actions';
import { StationsService } from 'admin/stations/services/stations.service';

@Injectable()
export class StationsEffects {
  constructor(
    private actions$: Actions,
    private stationsService: StationsService
  ) {}

  setLoadingStatusTrue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StationsActions.fetchStations),
      map(() => StationsActions.changeLoadingStatus({ stationsLoadingStatus: true }))
    );
  });

  setLoadingStatusFalse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StationsActions.fetchStationsSucces, StationsActions.fetchStationsFailes),
      map(() => StationsActions.changeLoadingStatus({ stationsLoadingStatus: false }))
    );
  });

  fetchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.fetchStations),
      switchMap(() =>
        this.stationsService.getStations().pipe(
          map((response) => StationsActions.fetchStationsSucces({ response })),
          catchError(() => of(StationsActions.fetchStationsFailes()))
        )
      )
    )
  );
}
