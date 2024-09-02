import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from './models/response-error';
import { SignUpResponseData } from './models/signup-response';
import { Observable } from 'rxjs';
import { SignInResponseData } from './models/signin-response';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  private isAuthenticated = false;

  private authSecretKey = 'authToken';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  public isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(this.authSecretKey);
  }

  public logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;

    this.store.dispatch(AuthActions.setIsAdminUpdated(false));
    this.store.dispatch(AuthActions.setAuthenticated(false));
    this.store.dispatch(AuthActions.setIsAdmin(false));

    this.router.navigate(['/']);
  }

  public signUp(email: string, password: string): Observable<SignUpResponseData> {
    const data = { email, password };
    const responseData: SignUpResponseData = {
      success: false,
      reason: ''
    };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/signup`, data).subscribe(
        (_response: NonNullable<unknown>) => {
          responseData.success = true;
          observer.next(responseData);
          observer.complete();
        },
        (error: ResponseError) => {
          if (error.status === 400) {
            responseData.reason = error.error.reason;
          }

          observer.next(responseData);
          observer.complete();
        }
      );
    });
  }

  public signIn(email: string, password: string): Observable<SignInResponseData> {
    const data = { email, password };
    const signInData: SignInResponseData = {
      success: false,
      message: '',
      reason: ''
    };

    console.log('data', data);

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/signin`, data).subscribe(
        (response) => {
          const res = response as { token: string };

          signInData.success = true;
          localStorage.setItem(this.authSecretKey, res.token);
          this.isAuthenticated = true;

          this.store.dispatch(AuthActions.setAuthenticated(true));

          observer.next(signInData);

          observer.complete();
        },
        (error: ResponseError) => {
          signInData.message = error.error.message;
          signInData.reason = error.error.reason;

          observer.next(signInData);
          observer.complete();
        }
      );
    });
  }
}
