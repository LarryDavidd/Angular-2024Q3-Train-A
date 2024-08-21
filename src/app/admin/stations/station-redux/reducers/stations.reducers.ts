import { createReducer, on } from '@ngrx/store';
import * as StationsActions from '../actions/stations.actions';
import { StationsState } from '../models/stations.models';

export const initialState: StationsState = {
  response: null,
  loadingStatus: false
};

export const routesReducer = createReducer(
  initialState,
  on(
    StationsActions.changeLoadingStatus,
    (state, { loadingStatus }): StationsState => ({
      ...state,
      loadingStatus
    })
  ),
  on(StationsActions.fetchStationsSucces, (state, { response }) => ({
    ...state,
    response
  })),
  on(StationsActions.fetchStationsFailes, (state) => ({
    ...state,
    response: null
  }))
);
