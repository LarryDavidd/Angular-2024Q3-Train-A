import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from './models/user-response';
import { Observable } from 'rxjs';
import { Error } from './models/error';
import { UpdateUser } from './models/update-user';
import { User } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = '/api/profile';

  private authSecretKey = 'authToken';

  public userData: UserResponse = {
    name: '',
    email: '',
    role: 'user',
    message: '',
    reason: ''
  };

  public token: string | null = null;

  public httpOptions!: { headers: HttpHeaders };

  constructor(private readonly http: HttpClient) {
    this.updateHttpOptions();
  }

  public updateHttpOptions() {
    this.token = localStorage.getItem(this.authSecretKey);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  public getProfile(): Observable<UserResponse> {
    this.updateHttpOptions();

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
