import { createAction, props } from '@ngrx/store';
import { CarriagesResponse } from 'admin/carriages/model/carriages.model';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ carriagesLoadingStatus: boolean }>());

export const fetchCarriages = createAction('[Favorite] Fetch Carriages');
export const fetchCarriagesSucces = createAction('[Favorite] Fetch Carriages Success', props<{ response: CarriagesResponse }>());
export const fetchCarriagesFailes = createAction('[Favorite] Fetch Carriages Failed');
