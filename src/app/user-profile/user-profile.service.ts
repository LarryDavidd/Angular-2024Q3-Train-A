import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from './models/user-response';
import { Observable } from 'rxjs';
import { Error } from './models/error';
import { AuthService } from 'auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = '/api';

  public userData: UserResponse = {
    name: '',
    email: '',
    role: 'user',
    message: '',
    reason: ''
  };

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  public getProfile(): Observable<UserResponse> {
    const token = this.authService.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    return new Observable((observer) => {
      this.http.get<UserResponse>(`${this.apiUrl}/profile`, httpOptions).subscribe(
        (response: UserResponse) => {
          this.userData = response;

          observer.next(this.userData);
          observer.complete();
        },
        (error: Error) => {
          this.userData.message = error.message;
          this.userData.reason = error.reason;

          observer.next(this.userData);
          observer.complete();
        }
      );
    });
  }
}
