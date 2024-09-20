import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carriage } from '../model/carriages.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarriagesService {
  private apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  getCarriages(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createCarriage(carriage: Carriage): Observable<Carriage> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
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
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
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
