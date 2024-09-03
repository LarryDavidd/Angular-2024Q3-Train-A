import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error.interceptor';

export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }];
