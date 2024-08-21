import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarriagesState } from '../model/carriages.model';

export const selectCarriagesState = createFeatureSelector<CarriagesState>('carriages');

export const selectCarriages = createSelector(selectCarriagesState, (state) => state.response);

export const selectCarriagesLoadingStatus = createSelector(selectCarriagesState, (state) => state.loadingStatus);
