import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ride } from '../redux/models/ride.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateRouteErrorResponse } from 'admin/routes/model/routes.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiUrl = '/api/route';

  private snackBar = inject(MatSnackBar);

  private http = inject(HttpClient);

  getRideById(id: string): Observable<Ride> {
    return this.http
      .get<Ride>(`${this.apiUrl}/${id}`, {
        headers: this.getHttpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'error';
    if (error.status === 401) {
      const errResponse = error.error as CreateRouteErrorResponse;
      errorMessage = `${errResponse.error.message} (${errResponse.error.reason})`;
    }
    this.snackBar.open('error' + ' ' + error.message, 'close', {
      duration: 3000
    });
    return throwError(() => new Error(errorMessage));
  }

  get getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
  }
}
