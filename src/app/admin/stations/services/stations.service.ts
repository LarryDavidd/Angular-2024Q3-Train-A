import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreatedStation, GetStationsResponse, StationCreateResponse } from '../model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  getStations(): Observable<GetStationsResponse> {
    return this.http.get<GetStationsResponse>('/api/station').pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteStation(id: number): Observable<GetStationsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http.delete<GetStationsResponse>(this.apiUrl + '/' + id, { headers: httpOptions.headers }).pipe(catchError(this.handleError));
  }

  addStation(newStation: CreatedStation): Observable<StationCreateResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http
      .post<StationCreateResponse>(this.apiUrl, newStation, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message || error.error.reason) {
      errorMessage = `Error: ${error.error.message || 'unknown'}, reason: ${error.error.reason || 'unknown'}`;
    }
    return throwError(() => ({ errorMessage, reason: error.error.reason || '' }));
  }
}
