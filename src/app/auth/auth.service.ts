import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from './models/response-error';
import { SignUpResponseData } from './models/signup-response';
import { Observable } from 'rxjs';
import { SignInResponseData } from './models/signin-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  public signUp(
    email: string,
    password: string
  ): Observable<SignUpResponseData> {
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

  public signIn(
    email: string,
    password: string
  ): Observable<SignInResponseData> {
    const data = { email, password };
    const signInData: SignInResponseData = {
      success: false,
      message: '',
      reason: ''
    };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/signin`, data).subscribe(
        (response) => {
          const res = response as { token: string };

          signInData.success = true;
          localStorage.setItem('authToken', res.token);

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
