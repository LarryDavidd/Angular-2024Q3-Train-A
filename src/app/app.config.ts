import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { RoutesEffects } from 'admin/routes/redux/effects/routes.effects';
import { routesReducer } from 'admin/routes/redux/reducers/routes.redusers';
import { routes } from 'app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      routes: routesReducer
    }),
    provideEffects([RoutesEffects]),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
