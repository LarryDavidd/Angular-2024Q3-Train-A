import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {
  rideId: string | null = null;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('start trip');
    this.rideId = this.route.snapshot.params['rideId'];

    this.route.queryParams.subscribe((params) => {
      this.fromStationId = params['from'];
      this.toStationId = params['to'];
    });
  }
}
