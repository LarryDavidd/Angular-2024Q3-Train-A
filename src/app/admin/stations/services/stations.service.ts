import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { CreatedStation, GetStationsResponse, StationCreateResponse } from '../model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private apiUrl = '/api/station';

  private stationsSubject = new BehaviorSubject<GetStationsResponse>([]);

  private stations$ = this.stationsSubject.asObservable();

  private removeMarkerSubject = new Subject<number>();

  removeMarker$ = this.removeMarkerSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStations(): Observable<GetStationsResponse> {
    if (this.stationsSubject.getValue().length === 0) {
      this.loadStations();
    }
    return this.stations$;
  }

  loadStations() {
    return this.http
      .get<GetStationsResponse>(this.apiUrl)
      .pipe(
        tap((res) => {
          this.stationsSubject.next(res);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  deleteStation(id: number): Observable<GetStationsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http.delete<GetStationsResponse>(this.apiUrl + '/' + id, { headers: httpOptions.headers }).pipe(
      tap(() => {
        this.loadStations();
      }),
      catchError(this.handleError)
    );
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
      .pipe(
        tap((res) => {
          this.loadStations();
          this.removeMarkerSubject.next(res.id);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message || error.error.reason) {
      errorMessage = `Error: ${error.error.message || 'unknown'}, reason: ${error.error.reason || 'unknown'}`;
    }
    return throwError(() => ({ errorMessage, reason: error.error.reason || '' }));
  }
}
