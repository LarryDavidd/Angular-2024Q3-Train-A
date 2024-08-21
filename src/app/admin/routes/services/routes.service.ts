import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetRoutesResponse } from '../model/routes.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private http: HttpClient) {}

  getRoutes(): Observable<GetRoutesResponse> {
    return this.http.get<GetRoutesResponse>('/api/route').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
