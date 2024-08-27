import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import * as RoutesActions from '../actions/routes.actions';
import { RoutesService } from 'admin/routes/services/routes.service';

@Injectable()
export class RoutesEffects {
  constructor(
    private actions$: Actions,
    private routesService: RoutesService
  ) {}

  setLoadingStatusTrue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutesActions.fetchRoutes),
      map(() => RoutesActions.changeLoadingStatus({ routesLoadingStatus: true }))
    );
  });

  setLoadingStatusFalse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutesActions.fetchRoutesSucces, RoutesActions.fetchRoutesFailes),
      map(() => RoutesActions.changeLoadingStatus({ routesLoadingStatus: false }))
    );
  });

  fetchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.fetchRoutes),
      switchMap(() =>
        this.routesService.getRoutes().pipe(
          map((response) => RoutesActions.fetchRoutesSucces({ response })),
          catchError(() => of(RoutesActions.fetchRoutesFailes()))
        )
      )
    )
  );
}
