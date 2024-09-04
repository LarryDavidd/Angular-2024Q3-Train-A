import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Trip } from 'trip/models/trip.model';

// TODO: to be removed
export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: Connection[];
}
type Connection = {
  id: number;
  distance: number;
};
export interface Carriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}
export interface Ride {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}
export interface Schedule {
  rideId: number;
  segments: Segment[];
}
export interface Segment {
  time: [string, string];
  price: {
    [key: string]: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) {}

  getRide(rideId: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${rideId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message || error.error.reason) {
      errorMessage = `Error: ${error.error.message || 'unknown'}, reason: ${error.error.reason || 'unknown'}`;
    }
    return throwError(() => errorMessage);
  }
}
