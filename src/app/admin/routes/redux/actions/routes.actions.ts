import { createAction, props } from '@ngrx/store';
import { GetRoutesResponse } from 'admin/routes/model/routes.model';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ loadingStatus: boolean }>());

export const fetchRoutes = createAction('[Favorite] Fetch routes');
export const fetchRoutesSucces = createAction('[Favorite] Fetch routes Success', props<{ response: GetRoutesResponse }>());
export const fetchRoutesFailes = createAction('[Favorite] Fetch routes Failed');
