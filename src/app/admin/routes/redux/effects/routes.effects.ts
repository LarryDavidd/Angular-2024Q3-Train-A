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

  fetchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.fetchRoutes),
      switchMap(() =>
        this.routesService.getRoutes().pipe(
          map((item) => RoutesActions.fetchRoutesSucces({ item })),
          catchError(() => of(RoutesActions.fetchRoutesFailes()))
        )
      )
    )
  );
}
