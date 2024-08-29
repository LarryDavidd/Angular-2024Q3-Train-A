import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouteModalComponent } from 'trip/components/route-modal/route-modal.component';
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

  seatStatuses: ('free' | 'occupied' | 'selected')[][] = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private modal: MatDialog
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

  getSeatsStatuses() {
    console.log('getSeatsStatuses');
    const seatsNumberInCarriage = (carriage: Carriage) => (carriage.leftSeats + carriage.rightSeats) * carriage.rows;
    const getCarriageByName = (carriageName: string) => this.listOfCarriages.find((c) => c.name === carriageName);
    console.log(this.rideData?.carriages);
    if (this.rideData) {
      this.rideData.carriages.map((c) => new Array(seatsNumberInCarriage(getCarriageByName(c)!)));
      this.seatStatuses.push(...this.rideData!.carriages.map((c) => new Array(seatsNumberInCarriage(getCarriageByName(c)!)).fill('free')));
      console.log(this.seatStatuses);
      const occupiedSeats = new Set<number>();
      this.rideData.schedule.segments.forEach((s, ind) => {
        if (ind >= this.rideData!.path.indexOf(this.fromStationId!) || ind < this.rideData!.path.indexOf(this.toStationId!)) {
          s.occupiedSeats.forEach((seat) => (seat > 0 ? occupiedSeats.add(seat - 1) : null));
        }
      });
      const addOccupiedSeats = (seatMatrix: ('free' | 'occupied' | 'selected')[][], occupied: Set<number>): ('free' | 'occupied' | 'selected')[][] => {
        const flatSeats: ('free' | 'occupied' | 'selected')[] = seatMatrix.flat();

        occupied.forEach((occupiedIndex) => {
          if (occupiedIndex >= 0 && occupiedIndex < flatSeats.length) {
            flatSeats[occupiedIndex] = 'occupied';
          }
        });

        const updatedMatrix: ('free' | 'occupied' | 'selected')[][] = [];
        let currentIndex = 0;

        for (const row of seatMatrix) {
          const rowLength = row.length;
          updatedMatrix.push(flatSeats.slice(currentIndex, currentIndex + rowLength));
          currentIndex += rowLength;
        }

        return updatedMatrix;
      };
      this.seatStatuses = addOccupiedSeats(this.seatStatuses, occupiedSeats);
    }
  }

  getFreeSeats(carInd: number): number {
    return this.seatStatuses[carInd].filter((s: string) => s === 'free').length;
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
    this.modal.open(RouteModalComponent);
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
        this.getSeatsStatuses();
      },
      error: (err) => console.log(err)
    });
  }

  getCarriageLabel(carriage: Carriage): string {
    const price = this.rideData!.schedule.segments.reduce((acc, segment, ind) => {
      if (ind >= this.rideData!.path.indexOf(this.fromStationId!) || ind < this.rideData!.path.indexOf(this.toStationId!)) {
        return acc + segment.price[carriage.name];
      } else {
        return acc;
      }
    }, 0);

    const freeSeats = this.seatStatuses.reduce((acc, c, i) => {
      if (this.rideData?.carriages[i] === carriage.name) {
        return acc + c.filter((s) => s === 'free').length;
      } else {
        return acc;
      }
    }, 0);

    return `Carriage type ${carriage.name}: ${freeSeats} | $${price}`;
  }

  selectSeatInCarriage() {
    console.log('select');
  }
}
