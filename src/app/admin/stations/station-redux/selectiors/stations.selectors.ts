import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StationsState } from '../models/stations.models';

export const selectStationsState = createFeatureSelector<StationsState>('stations');

export const selectStations = createSelector(selectStationsState, (state) => state.response);

export const selectStationsLoadingStatus = createSelector(selectStationsState, (state) => state.loadingStatus);
