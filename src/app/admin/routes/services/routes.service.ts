import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  CreateRouteErrorResponse,
  CreateRouteRequest,
  CreateRouteSuccessResponse,
  DeleteRouteSuccessResponse,
  GetRoutesResponse,
  UpdateRouteRequest,
  UpdateRouteSuccessResponse
} from '../model/routes.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private http: HttpClient) {}

  private snackBar = inject(MatSnackBar);

  getRoutes(): Observable<GetRoutesResponse> {
    return this.http
      .get<GetRoutesResponse>('/api/route')
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  createRoute(request: CreateRouteRequest): Observable<CreateRouteSuccessResponse> {
    return this.http
      .post<CreateRouteSuccessResponse>('/api/route', request, {
        headers: this.getHttpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  updateRoute(id: string, request: UpdateRouteRequest): Observable<UpdateRouteSuccessResponse> {
    return this.http
      .put<UpdateRouteSuccessResponse>(`/api/route/${id}`, request, {
        headers: this.getHttpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  deleteRoute(id: number): Observable<DeleteRouteSuccessResponse> {
    return this.http
      .delete<DeleteRouteSuccessResponse>(`/api/route/${id}`, {
        headers: this.getHttpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'error';
    if (error.status === 401) {
      const errResponse = error.error as CreateRouteErrorResponse;
      errorMessage = `${errResponse.error.message} (${errResponse.error.reason})`;
    }
    this.snackBar.open('error' + ' ' + error.message, 'close', {
      duration: 3000
    });
    return throwError(() => new Error(errorMessage));
  }

  get getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
  }
}
