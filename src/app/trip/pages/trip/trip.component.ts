import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouteModalComponent } from 'trip/components/route-modal/route-modal.component';
import { Trip } from 'trip/models/trip.model';
import { BookingService } from 'trip/services/booking.service';
import { Carriage, Station, TripService } from 'trip/services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit, OnDestroy {
  rideId: number | null = null;

  rideData: Trip | null = null;

  fromStationId: number | null = null;

  toStationId: number | null = null;

  listOfStations: Station[] = [];

  listOfCarriagesTypes: Set<string> = new Set();

  listOfCarriages: Carriage[] = [];

  isBookModalVisible = false;

  seatStatuses: ('free' | 'occupied' | 'selected')[][] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private bookingService: BookingService,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.rideId = +this.route.snapshot.params['rideId'];

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.fromStationId = +params['from'];
      this.toStationId = +params['to'];
    });

    this.bookingService.getInitialTripParams(this.rideId, this.fromStationId!, this.toStationId!);

    if (this.rideId) {
      this.tripService
        .getRide(+this.rideId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSeatsStatuses() {
    console.log('getSeatsStatuses');
    // const seatsNumberInCarriage = (carriage: Carriage) => (carriage.leftSeats + carriage.rightSeats) * carriage.rows;
    const getCarriageByName = (carriageName: string) => this.listOfCarriages.find((c) => c.name === carriageName);
    console.log(this.rideData?.carriages);
    if (this.rideData) {
      // this.rideData.carriages.map((c) => new Array(seatsNumberInCarriage(getCarriageByName(c)!)));
      // this.seatStatuses.push(...this.rideData!.carriages.map((c) => new Array(seatsNumberInCarriage(getCarriageByName(c)!)).fill('free')));
      this.seatStatuses = this.rideData.carriages.map((c) => {
        const carriage = getCarriageByName(c);
        return new Array((carriage!.leftSeats + carriage!.rightSeats) * carriage!.rows).fill('free');
      });
      console.log(this.seatStatuses);
      const occupiedSeats = new Set<number>();
      this.rideData.schedule.segments.forEach((s, ind) => {
        if (ind >= this.rideData!.path.indexOf(this.fromStationId!) || ind < this.rideData!.path.indexOf(this.toStationId!)) {
          s.occupiedSeats.forEach((seat) => {
            if (seat > 0) occupiedSeats.add(seat - 1);
          });
        }
      });
      /*
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
      };*/
      // this.seatStatuses = addOccupiedSeats(this.seatStatuses, occupiedSeats);
      occupiedSeats.add(2);
      occupiedSeats.add(60);
      console.log(occupiedSeats);
      this.seatStatuses = this.updateOccupiedSeats(this.seatStatuses, occupiedSeats);
      console.log(this.seatStatuses);
    }
  }

  updateOccupiedSeats(seatMatrix: ('free' | 'occupied' | 'selected')[][], occupied: Set<number>): ('free' | 'occupied' | 'selected')[][] {
    let lastSeatIndex: number = 0;
    return seatMatrix.map((car) =>
      car.map((seat) => {
        lastSeatIndex++;
        console.log(occupied.has(lastSeatIndex));
        return occupied.has(lastSeatIndex) ? 'occupied' : seat;
      })
    );
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
    this.tripService
      .getStations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stations) => {
          this.listOfStations = stations;
        }
      });
  }

  getStationName(id: number) {
    return this.listOfStations.find((station) => station.id === id)?.city;
  }

  getCarriages() {
    this.tripService
      .getCarriages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (carriages) => {
          this.listOfCarriages = carriages.filter((carriage) => this.listOfCarriagesTypes.has(carriage.code));
          this.getSeatsStatuses();
        },
        error: (err) => console.log(err)
      });
  }

  getCarriageLabel(carriage: Carriage): string {
    const price = this.getPriceForSegments(carriage.name);

    const freeSeats = this.getFreeSeats(this.listOfCarriages.indexOf(carriage));

    return `Carriage type ${carriage.name}: ${freeSeats} | $${(price / 100).toFixed(2)}`;
  }

  getPriceForSegments(carriageName: string) {
    return this.rideData!.schedule.segments.reduce((acc, segment, ind) => {
      if (ind >= this.rideData!.path.indexOf(this.fromStationId!) || ind < this.rideData!.path.indexOf(this.toStationId!)) {
        return acc + segment.price[carriageName];
      } else {
        return acc;
      }
    }, 0);
  }

  onSeatSelected(carriageIndex: number, seatIndex: number): void {
    console.log('click');
    console.log(carriageIndex, seatIndex);
    this.seatStatuses = this.seatStatuses.map((car) => car.map((s) => (s === 'selected' ? 'free' : s)));
    this.seatStatuses[carriageIndex][seatIndex] = 'selected';
    this.bookingService.updateBooking(carriageIndex, seatIndex, this.getPriceForSegments(this.rideData!.carriages[carriageIndex]));
    this.openBookModal(carriageIndex, seatIndex);
  }

  openBookModal(carriageIndex: number, seatIndex: number) {
    console.log(carriageIndex, seatIndex);
    this.isBookModalVisible = true;
    console.log(this.isBookModalVisible);
  }

  closeModal() {
    this.isBookModalVisible = false;
  }
}
