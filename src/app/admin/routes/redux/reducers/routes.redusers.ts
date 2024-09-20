import { createReducer, on } from '@ngrx/store';
import * as RoutesActions from '../actions/routes.actions';
import { RoutesState } from '../models/routes.models';

export const initialState: RoutesState = {
  response: null,
  routesLoadingStatus: false
};

export const routesReducer = createReducer(
  initialState,
  on(
    RoutesActions.changeLoadingStatus,
    (state, { routesLoadingStatus }): RoutesState => ({
      ...state,
      routesLoadingStatus
    })
  ),
  on(RoutesActions.fetchRoutesSucces, (state, { response }) => ({
    ...state,
    response
  })),
  on(RoutesActions.fetchRoutesFailes, (state) => ({
    ...state,
    response: null
  }))
);
