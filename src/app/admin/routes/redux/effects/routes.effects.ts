import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import * as RoutesActions from '../actions/routes.actions';
import { RoutesService } from 'admin/routes/services/routes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class RoutesEffects {
  constructor(
    private actions$: Actions,
    private routesService: RoutesService,
    private store: Store
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

  fetchRoutes$ = createEffect(() =>
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

  deleteRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.deleteRoute),
      switchMap((payload) =>
        this.routesService.deleteRoute(payload.id).pipe(
          map(() => RoutesActions.deleteRouteSuccess()),
          catchError(() => of(RoutesActions.deleteRouteFailure()))
        )
      )
    )
  );

  private snackBar = inject(MatSnackBar);

  deleteRouteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoutesActions.deleteRouteSuccess),
        tap(() => {
          this.store.dispatch(RoutesActions.fetchRoutes());
          this.snackBar.open('Route delete successfully', 'close', {
            duration: 3000
          });
        })
      ),
    { dispatch: false }
  );

  deleteRouteFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoutesActions.deleteRouteFailure),
        tap(() => {
          this.snackBar.open('something went wrong, please try again', 'close', {
            duration: 3000
          });
        })
      ),
    { dispatch: false }
  );
}
