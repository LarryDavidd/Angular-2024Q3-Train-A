import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'auth/auth.service';
import { Observable, Subject } from 'rxjs';
import { Order } from './models/order';
import { User } from '../user-profile/models/users';
import { ResponseError } from 'auth/models/response-error';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = '/api/order';

  public token: string | null = null;

  public httpOptions: { headers: HttpHeaders };

  private isUpdateOrdersSubject: Subject<boolean> = new Subject<boolean>();

  public isUpdateOrders$: Observable<boolean> = this.isUpdateOrdersSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.token = this.authService.getAuthToken();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  public getUsers() {
    return this.http.get<User[]>('api/users', this.httpOptions);
  }

  public getOrders(all?: boolean): Observable<Order[]> {
    let params = new HttpParams();

    if (all) {
      params = params.set('all', 'true');
    }

    const options = {
      params: params,
      ...this.httpOptions
    };

    return this.http.get<Order[]>(this.apiUrl, options);
  }

  public cancelOrder(orderId: Order['id']): Observable<{ success: boolean; error?: { message: string } }> {
    return new Observable((observer) => {
      this.http.delete(`${this.apiUrl}/${orderId}`).subscribe(
        () => {
          this.isUpdateOrdersSubject.next(true);

          observer.next({ success: true });
          observer.complete();
        },
        (error: ResponseError) => {
          observer.next({
            success: false,
            error: {
              message: error.error.message
            }
          });
          observer.complete();
        }
      );
    });
  }
}
