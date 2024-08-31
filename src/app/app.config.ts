import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { CarriagesEffects } from 'admin/carriages/carriages-redux/effects/carriages.effects';
import { CarriagesReducer } from 'admin/carriages/carriages-redux/reducers/carriages.reducers';
import { RideEffects } from 'admin/ride/redux/effects/ride.effects';
import { rideReducer } from 'admin/ride/redux/reducers/ride.reducers';
import { RoutesEffects } from 'admin/routes/redux/effects/routes.effects';
import { routesReducer } from 'admin/routes/redux/reducers/routes.redusers';
import { StationsEffects } from 'admin/stations/station-redux/effects/stations.effects';
import { StationsReducer } from 'admin/stations/station-redux/reducers/stations.reducers';
import { routes } from 'app.routes';

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
      carriages: CarriagesReducer
    }),
    provideEffects([RoutesEffects, StationsEffects, CarriagesEffects, RideEffects]),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
