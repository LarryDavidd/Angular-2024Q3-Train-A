import { createReducer, on } from '@ngrx/store';
import * as RideActions from '../actions/ride.actions';
import { RideState } from '../models/ride.models';

export const initialState: RideState = {
  ride: null,
  ridesLoadingStatus: false,
  error: null
};

export const rideReducer = createReducer(
  initialState,
  on(RideActions.retrieveRide, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RideActions.retrieveRideSuccess, (state, { ride }) => ({
    ...state,
    loading: false,
    ride
  })),
  on(RideActions.retrieveRideFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
