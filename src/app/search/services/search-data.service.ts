import { Injectable } from '@angular/core';
import { SearchResponse } from '../models/search-response.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  private dataSubject: BehaviorSubject<SearchResponse | null> = new BehaviorSubject<SearchResponse | null>(null);

  public data$: Observable<SearchResponse | null> = this.dataSubject.asObservable();

  public updateData(newData: SearchResponse): void {
    this.dataSubject.next(newData);
  }
}
