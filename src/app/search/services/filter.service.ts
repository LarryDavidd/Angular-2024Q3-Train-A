import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);

  selectedDate$ = this.selectedDateSubject.asObservable();

  setSelectedDate(date: Date | null) {
    this.selectedDateSubject.next(date);
  }
}
