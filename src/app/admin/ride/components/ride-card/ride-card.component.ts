import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Schedule } from 'admin/ride/model/ride.model';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton, MatIcon],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent {
  @Input() schedule!: Schedule;

  @Input() path!: number[];

  getPrices(prices: { [key: string]: number }) {
    return Object.entries(prices);
  }

  onPriceChange() {
    console.log(this.schedule.segments);
  }

  submit() {
    console.log('submit');
  }
}
