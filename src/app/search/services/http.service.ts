import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchFormValueModel } from '../models/search-form-value.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) {}

  searchRoutes(value: SearchFormValueModel): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('fromLatitude', value.cityFrom.latitude.toString())
      .set('fromLongitude', value.cityFrom.longitude.toString())
      .set('toLatitude', value.cityTo.latitude.toString())
      .set('toLongitude', value.cityTo.longitude.toString());

    if (value.startDate) {
      const unixTimestamp = value.startDate.getTime();
      params = params.set('time', unixTimestamp);
    }

    return this.http.get<SearchResponse>(this.apiUrl, { params });
  }

  getRout(id: number): Observable<SearchResponse> {
    const params = new HttpParams().set('stationId', id);

    return this.http.get<SearchResponse>(this.apiUrl, { params });
  }
}
