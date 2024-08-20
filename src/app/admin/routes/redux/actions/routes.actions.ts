import { createAction, props } from '@ngrx/store';

export const changeLoadingStatus = createAction('[Youtube] Change Loading Status', props<{ loadingStatus: boolean }>());

export const fetchRoutes = createAction('[Favorite] Fetch routes');
export const fetchRoutesSucces = createAction('[Favorite] Fetch routes Success', props<{ item: Response }>());
export const fetchRoutesFailes = createAction('[Favorite] Fetch routes Failed');
