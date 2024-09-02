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

  private connectionsSource = new BehaviorSubject<number[]>([]);

  coordinates$ = this.coordinatesSource.asObservable();

  connections$ = this.connectionsSource.asObservable();

  updateCoordinates(latitude: number, longitude: number) {
    this.coordinatesSource.next({ latitude, longitude });
  }

  updateConnections(connectionIds: number[]) {
    this.connectionsSource.next(connectionIds);
  }
}
