import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetStationsResponse } from '../model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<GetStationsResponse> {
    return this.http.get<GetStationsResponse>('/api/station').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
