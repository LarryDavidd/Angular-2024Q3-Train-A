import { createReducer, on } from '@ngrx/store';
import * as StationsActions from '../actions/stations.actions';
import { StationsState } from '../models/stations.models';

export const initialState: StationsState = {
  response: null,
  stationsLoadingStatus: false
};

export const StationsReducer = createReducer(
  initialState,
  on(
    StationsActions.changeLoadingStatus,
    (state, { stationsLoadingStatus }): StationsState => ({
      ...state,
      stationsLoadingStatus
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
