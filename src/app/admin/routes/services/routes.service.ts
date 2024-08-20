import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private http: HttpClient) {}

  getRoutes(): Observable<Response> {
    return this.http.get<Response>('/api/route').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
