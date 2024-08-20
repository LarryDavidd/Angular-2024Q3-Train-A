import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from './models/response-error';
import { ResponseData } from './models/signup-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  signUp(email: string, password: string): Observable<ResponseData> {
    const data = { email, password };
    const responseData: ResponseData = {
      success: false,
      reason: ''
    };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/signup`, data).subscribe(
        (response: NonNullable<unknown>) => {
          console.log('Response from server:', response);

          responseData.success = true;
          observer.next(responseData);
          observer.complete();
        },
        (error: ResponseError) => {
          console.error('Error while making the request', error);

          if (error.status === 400) {
            responseData.reason = error.error.reason;
          }

          observer.next(responseData);
          observer.complete();
        }
      );
    });
  }
}
