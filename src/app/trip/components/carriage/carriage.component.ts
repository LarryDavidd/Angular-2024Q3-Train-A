import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() seatSelected = new EventEmitter<number>();

  selectSeat(ind: number): void {
    console.log('click in carriage', ind);
    this.seatSelected.emit(ind);
  }
}
