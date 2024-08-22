import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from 'admin/models/stations.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl);
  }

  deleteStation(id: number): Observable<Station[]> {
    return this.http.delete<Station[]>(this.apiUrl + '/' + id).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message || error.error.reason) {
      errorMessage = `Error: ${error.error.message || 'unknown'}, reason: ${error.error.reason || 'unknown'}`;
    }
    return throwError(() => errorMessage);
  }
}
