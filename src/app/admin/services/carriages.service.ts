import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Carriage } from 'admin/models/carriages.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarriagesService {
  private apiUrl = '/api/carriage';

  token = '';

  constructor(private http: HttpClient) {}

  // TODO: move to auth service
  signupAdmin(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/signin', { email: 'admin@admin.com', password: 'my-password' });
  }

  getCarriages(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createCarriage(carriage: Carriage): Observable<Carriage> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    return this.http
      .post<Carriage>(this.apiUrl, carriage, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  updateCarriage(carriage: Carriage): Observable<Carriage> {
    const url = `${this.apiUrl}/${carriage.code}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    return this.http
      .put<Carriage>(url, carriage, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message || error.error.reason) {
      errorMessage = `Error: ${error.error.message || 'unknown'}, reason: ${error.error.reason || 'unknown'}`;
    }
    return throwError(() => errorMessage);
  }
}
