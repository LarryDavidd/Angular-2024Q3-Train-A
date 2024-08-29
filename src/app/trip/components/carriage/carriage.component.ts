import { Component, Input } from '@angular/core';
import { Carriage } from 'trip/services/trip.service';

@Component({
  selector: 'app-carriage',
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss'
})
export class CarriageComponent {
  @Input() carriageIndex: number = 0;

  @Input() seatStatuses: ('free' | 'occupied' | 'selected')[] = [];

  @Input() carriage: Partial<Carriage> = { rows: 0, leftSeats: 0, rightSeats: 0 };

  @Input() carriages: Carriage[] = [];

  selectSeat(ind: number): void {
    const seatIndexInTrain =
      this.carriages.reduce((acc, carriage, i) => (i < this.carriageIndex ? acc + (carriage.leftSeats + carriage.rightSeats) * carriage.rows : acc), 0) + ind;
    if (this.seatStatuses[seatIndexInTrain] === 'occupied') return;
    const selectedSeatIndex = this.seatStatuses.indexOf('selected');
    if (selectedSeatIndex !== -1) {
      this.seatStatuses[selectedSeatIndex] = 'free';
    }
    this.seatStatuses[seatIndexInTrain] = 'selected';
  }
}
