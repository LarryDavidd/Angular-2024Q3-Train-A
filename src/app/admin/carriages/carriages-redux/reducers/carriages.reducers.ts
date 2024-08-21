import { createReducer, on } from '@ngrx/store';
import * as CarriagesActions from '../actions/carriages.actions';
import { CarriagesState } from '../model/carriages.model';

export const initialState: CarriagesState = {
  response: null,
  loadingStatus: false
};

export const CarriagesReducer = createReducer(
  initialState,
  on(
    CarriagesActions.changeLoadingStatus,
    (state, { loadingStatus }): CarriagesState => ({
      ...state,
      loadingStatus
    })
  ),
  on(CarriagesActions.fetchCarriagesSucces, (state, { response }) => ({
    ...state,
    response
  })),
  on(CarriagesActions.fetchCarriagesFailes, (state) => ({
    ...state,
    response: null
  }))
);
