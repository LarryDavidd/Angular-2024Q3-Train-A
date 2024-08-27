import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'trip/services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {
  rideId: string | null = null;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    console.log('start trip');
    this.rideId = this.route.snapshot.params['rideId'];

    this.route.queryParams.subscribe((params) => {
      this.fromStationId = params['from'];
      this.toStationId = params['to'];
    });

    if (this.rideId) {
      this.tripService.getRide(+this.rideId).subscribe((ride) => {
        console.log(ride);
      });
    }
  }
}
