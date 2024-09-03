import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import * as CarriagesActions from '../actions/carriages.actions';
import { CarriagesService } from 'admin/carriages/services/carriages.service';

@Injectable()
export class CarriagesEffects {
  constructor(
    private actions$: Actions,
    private carriagesService: CarriagesService
  ) {}

  setLoadingStatusTrue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriagesActions.fetchCarriages),
      map(() => CarriagesActions.changeLoadingStatus({ carriagesLoadingStatus: true }))
    );
  });

  setLoadingStatusFalse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriagesActions.fetchCarriagesSucces, CarriagesActions.fetchCarriagesFailes),
      map(() => CarriagesActions.changeLoadingStatus({ carriagesLoadingStatus: false }))
    );
  });

  fetchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarriagesActions.fetchCarriages),
      switchMap(() =>
        this.carriagesService.getCarriages().pipe(
          map((response) => CarriagesActions.fetchCarriagesSucces({ response })),
          catchError(() => of(CarriagesActions.fetchCarriagesFailes()))
        )
      )
    )
  );
}
