import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'trip/models/trip.model';
import { Carriage, Station, TripService } from 'trip/services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {
  rideId: number | null = null;

  rideData: Trip | null = null;

  fromStationId: number | null = null;

  toStationId: number | null = null;

  listOfStations: Station[] = [];

  listOfCarriagesTypes: Set<string> = new Set();

  listOfCarriages: Carriage[] = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.rideId = +this.route.snapshot.params['rideId'];

    this.route.queryParams.subscribe((params) => {
      this.fromStationId = +params['from'];
      this.toStationId = +params['to'];
    });

    if (this.rideId) {
      this.tripService.getRide(+this.rideId).subscribe({
        next: (ride) => {
          this.rideData = ride;
          this.listOfCarriagesTypes = new Set(ride.carriages);
          console.log(ride, this.listOfCarriagesTypes);
          this.getCarriages();
        },
        error: (err) => console.log(err)
      });
    }

    this.getStations();
  }

  transformDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return date.toLocaleDateString('en-US', options);
  }

  openRouteModal() {
    console.log('open modal');
  }

  getStations() {
    this.tripService.getStations().subscribe({
      next: (stations) => {
        this.listOfStations = stations;
      }
    });
  }

  getStationName(id: number) {
    return this.listOfStations.find((station) => station.id === id)?.city;
  }

  getCarriages() {
    this.tripService.getCarriages().subscribe({
      next: (carriages) => {
        this.listOfCarriages = carriages.filter((carriage) => this.listOfCarriagesTypes.has(carriage.code));
        console.log(this.listOfCarriages);
      },
      error: (err) => console.log(err)
    });
  }
}
