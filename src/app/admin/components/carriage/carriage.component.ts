import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carriage',
  templateUrl: './carriage.component.html'
})
export class CarriageComponent {
  @Input() rows: number = 0;

  @Input() leftSeats: number = 0;

  @Input() rightSeats: number = 0;
}
