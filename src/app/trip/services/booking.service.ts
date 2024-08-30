import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order, OrderResponse } from 'trip/models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private rideIdSubject = new BehaviorSubject<number>(0);

  private stationStartSubject = new BehaviorSubject<number>(0);

  private stationEndSubject = new BehaviorSubject<number>(0);

  private carNumberSubject = new BehaviorSubject<number>(0);

  private seatNumberSubject = new BehaviorSubject<number>(0);

  private priceSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  get rideId$(): Observable<number> {
    return this.rideIdSubject.asObservable();
  }

  get stationStart$(): Observable<number> {
    return this.stationStartSubject.asObservable();
  }

  get stationEnd$(): Observable<number> {
    return this.stationEndSubject.asObservable();
  }

  get carNumber$(): Observable<number> {
    return this.carNumberSubject.asObservable();
  }

  get seatNumber$(): Observable<number> {
    return this.seatNumberSubject.asObservable();
  }

  get price$(): Observable<number> {
    return this.priceSubject.asObservable();
  }

  getInitialTripParams(rideId: number, stationStart: number, stationEnd: number) {
    this.rideIdSubject.next(rideId);
    this.stationStartSubject.next(stationStart);
    this.stationEndSubject.next(stationEnd);
  }

  updateBooking(car: number, seat: number, price: number) {
    this.carNumberSubject.next(car);
    this.seatNumberSubject.next(seat);
    this.priceSubject.next(price);
  }

  makeOrder(): Observable<OrderResponse> {
    const body: Order = {
      rideId: this.rideIdSubject.value,
      seat: this.seatNumberSubject.value,
      stationStart: this.stationStartSubject.value,
      stationEnd: this.stationEndSubject.value
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http.post<OrderResponse>('/api/order', body, {
      headers: httpOptions.headers
    });
  }
}
