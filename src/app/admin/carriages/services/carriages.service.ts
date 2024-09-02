import { Injectable } from '@angular/core';
import { CarriagesResponse } from '../model/carriages.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarriagesService {
  constructor(private http: HttpClient) {}

  getCarriages(): Observable<CarriagesResponse> {
    return this.http.get<CarriagesResponse>('/api/carriage').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
