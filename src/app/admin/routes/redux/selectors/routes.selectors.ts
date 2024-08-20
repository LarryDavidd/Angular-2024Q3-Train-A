import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutesState } from '../models/routes.models';

export const selectRoutesState = createFeatureSelector<RoutesState>('routes');

export const selectRoutes = createSelector(selectRoutesState, (state) => state.response);

export const selectLoadingStatus = createSelector(selectRoutesState, (state) => state.loadingStatus);
