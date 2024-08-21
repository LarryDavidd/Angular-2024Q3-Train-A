import { createAction, props } from '@ngrx/store';
import { GetStationsResponse } from 'admin/stations/model/station.model';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ loadingStatus: boolean }>());

export const fetchStations = createAction('[Favorite] Fetch Stations');
export const fetchStationsSucces = createAction('[Favorite] Fetch Stations Success', props<{ response: GetStationsResponse }>());
export const fetchStationsFailes = createAction('[Favorite] Fetch Stations Failed');
