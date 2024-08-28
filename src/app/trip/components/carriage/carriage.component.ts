import { Component, Input } from '@angular/core';
import { Carriage } from 'trip/services/trip.service';

@Component({
  selector: 'app-carriage',
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss'
})
export class CarriageComponent {
  @Input() carriage: Partial<Carriage> = { rows: 0, leftSeats: 0, rightSeats: 0 };
}
