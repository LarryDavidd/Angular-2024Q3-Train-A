import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreateRouteErrorResponse, CreateRouteRequest, CreateRouteSuccessResponse, GetRoutesResponse } from '../model/routes.model';

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

  createRoute(request: CreateRouteRequest): Observable<CreateRouteSuccessResponse> {
    return this.http.post<CreateRouteSuccessResponse>('/api/route', request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'error';
    if (error.status === 401) {
      const errResponse = error.error as CreateRouteErrorResponse;
      errorMessage = `${errResponse.error.message} (${errResponse.error.reason})`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
