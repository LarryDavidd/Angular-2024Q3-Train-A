import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  signUp(email: string, password: string) {
    const data = { email, password };

    this.http.post(`${this.apiUrl}/signup`, data).subscribe(
      (response) => {
        console.log('Response from server:', response);
      },
      (error) => {
        console.error('Error while making the request', error);
      }
    );
  }
}
