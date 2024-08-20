import { createReducer, on } from '@ngrx/store';
import * as RoutesActions from '../actions/routes.actions';
import { RoutesState } from '../models/routes.models';

export const initialState: RoutesState = {
  response: null,
  loadingStatus: false
};

export const routesReducer = createReducer(
  initialState,
  on(
    RoutesActions.changeLoadingStatus,
    (state, { loadingStatus }): RoutesState => ({
      ...state,
      loadingStatus
    })
  ),
  on(RoutesActions.fetchRoutesSucces, (state, { item }) => ({
    ...state,
    item
  })),
  on(RoutesActions.fetchRoutesFailes, (state) => ({
    ...state,
    item: null
  }))
);
