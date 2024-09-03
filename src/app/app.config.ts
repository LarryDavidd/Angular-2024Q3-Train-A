import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { CarriagesEffects } from 'admin/carriages/carriages-redux/effects/carriages.effects';
import { CarriagesReducer } from 'admin/carriages/carriages-redux/reducers/carriages.reducers';
import { RideEffects } from 'admin/ride/redux/effects/ride.effects';
import { rideReducer } from 'admin/ride/redux/reducers/ride.reducers';
import { RoutesEffects } from 'admin/routes/redux/effects/routes.effects';
import { routesReducer } from 'admin/routes/redux/reducers/routes.redusers';
import { StationsEffects } from 'admin/stations/station-redux/effects/stations.effects';
import { StationsReducer } from 'admin/stations/station-redux/reducers/stations.reducers';
import { routes } from 'app.routes';
import { authReducer } from 'auth/store/auth.reducer';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from 'shared/http-interceptors';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      ride: rideReducer,
      routes: routesReducer,
      stations: StationsReducer,
      carriages: CarriagesReducer,
      auth: authReducer
    }),
    provideEffects([RoutesEffects, StationsEffects, CarriagesEffects, RideEffects]),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ]
};
