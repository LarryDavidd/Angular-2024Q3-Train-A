import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapFormSynchroService {
  private coordinatesSource = new BehaviorSubject<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0
  });

  coordinates$ = this.coordinatesSource.asObservable();

  updateCoordinates(latitude: number, longitude: number) {
    this.coordinatesSource.next({ latitude, longitude });
  }
}
