import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideCardComponent } from '../ride-card/ride-card.component';
import { Schedule } from 'admin/ride/model/ride.model';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RideCardComponent, MatListModule],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss'
})
export class RideListComponent {
  @Input() schedule!: Schedule[];

  @Input() path!: number[];
}
