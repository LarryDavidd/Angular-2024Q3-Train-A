import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RideState } from '../models/ride.models';

export const selectRideState = createFeatureSelector<RideState>('ride');

export const selectRide = createSelector(selectRideState, (state: RideState) => state.ride);

export const selectRidesLoadingStatus = createSelector(selectRideState, (state: RideState) => state.ridesLoadingStatus);

export const selectError = createSelector(selectRideState, (state: RideState) => state.error);
