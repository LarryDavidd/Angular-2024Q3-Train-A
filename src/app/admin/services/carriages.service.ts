import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carriage } from 'admin/models/carriages.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarriagesService {
  private apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  getCarriages(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>(this.apiUrl);
  }

  createCarriage(carriage: Carriage): Observable<Carriage> {
    return this.http.post<Carriage>(this.apiUrl, carriage);
  }

  updateCarriage(carriage: Carriage): Observable<Carriage> {
    const url = `${this.apiUrl}/${carriage.code}`;
    return this.http.put<Carriage>(url, carriage);
  }
}
