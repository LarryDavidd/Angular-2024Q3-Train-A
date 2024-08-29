import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from './models/user-response';
import { Observable } from 'rxjs';
import { Error } from './models/error';
import { AuthService } from 'auth/auth.service';
import { UpdateUser } from './models/update-user';
import { User } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = '/api/profile';

  public userData: UserResponse = {
    name: '',
    email: '',
    role: 'user',
    message: '',
    reason: ''
  };

  public token: string | null = null;

  public httpOptions: { headers: HttpHeaders };

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.token = this.authService.getAuthToken();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  public getProfile(): Observable<UserResponse> {
    return new Observable((observer) => {
      this.http.get<UserResponse>(`${this.apiUrl}`, this.httpOptions).subscribe(
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

  public getUsers() {
    return this.http.get<User[]>(`/api/users`, this.httpOptions);
  }

  public updateUser(data: UpdateUser): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}`, data, this.httpOptions);
  }

  public updatePassword(password: string): Observable<Error> {
    return this.http.put<Error>(`${this.apiUrl}/password`, { password }, this.httpOptions);
  }

  public terminateSession() {
    return this.http.delete(`api/logout`, this.httpOptions);
  }
}
