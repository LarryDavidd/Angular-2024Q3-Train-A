import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideCardComponent } from '../ride-card/ride-card.component';
import { ResponceBody, Schedule, Segment } from 'admin/ride/model/ride.model';
import * as StationsActions from 'admin/stations/station-redux/actions/stations.actions';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RideCardComponent, MatListModule],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss'
})
export class RideListComponent implements OnInit {
  store = inject(Store);

  @Output() updateRide = new EventEmitter<ResponceBody>();

  @Output() deleteRide = new EventEmitter<{ rideId: number }>();

  @Input() schedule!: Schedule[];

  @Input() path!: number[];

  updateCurrentRide({ rideId, segment, index }: { rideId: number; segment: Segment; index: number }) {
    const currentSchedule = this.schedule.find((schedule) => schedule.rideId === rideId);
    if (currentSchedule) {
      const currentSegment = currentSchedule.segments.map((value, i) => (i === index ? segment : value));
      this.updateRide.emit({ rideId, segment: currentSegment });
    }
  }

  ngOnInit(): void {
    this.store.dispatch(StationsActions.fetchStations());
  }
}
