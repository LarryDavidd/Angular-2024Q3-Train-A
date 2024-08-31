import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InfoModalComponent } from 'trip/components/info-modal/info-modal.component';
import { RouteModalComponent } from 'trip/components/route-modal/route-modal.component';
import { SeatStatusType, Trip } from 'trip/models/trip.model';
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
            this.checkStations();
            this.listOfCarriagesTypes = new Set(ride.carriages);
            console.log(ride);
            this.getCarriages();
          },
          error: (err) => console.error(err)
        });
    }

    this.getStations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkStations() {
    let errorMessage: string = '';

    const isFromStationExists = this.rideData!.path.find((s) => s === this.fromStationId);
    if (isFromStationExists === undefined) {
      errorMessage = `Error: station with id ${this.fromStationId} is not found`;
    }

    const isToStationExists = this.rideData!.path.find((s) => s === this.toStationId);
    if (isToStationExists === undefined) {
      errorMessage = `Error: station with id ${this.toStationId} is not found`;
    }

    if (isFromStationExists === undefined && isToStationExists === undefined) {
      errorMessage = `Error: stations with ids ${this.fromStationId} and ${this.toStationId} are not found`;
    }

    if (errorMessage) {
      this.fromStationId = this.rideData!.path[0];
      this.toStationId = this.rideData!.path[this.rideData!.path.length - 1];
      this.modal.open(InfoModalComponent, {
        data: {
          errorMessage,
          suggestionMessage: 'Please go to the main page and try again.',
          linkForRedirect: '/',
          errorSource: 'Trip parameters'
        }
      });
    }
  }

  getSeatsStatuses() {
    const getCarriageByName = (carriageName: string) => this.listOfCarriages.find((c) => c.name === carriageName);

    if (this.rideData) {
      this.seatStatuses = this.rideData.carriages.map((c) => {
        const carriage = getCarriageByName(c);
        return new Array((carriage!.leftSeats + carriage!.rightSeats) * carriage!.rows).fill('free');
      });
      const occupiedSeats = new Set<number>();
      this.rideData.schedule.segments.forEach((s, ind) => {
        if (ind >= this.rideData!.path.indexOf(this.fromStationId!) || ind < this.rideData!.path.indexOf(this.toStationId!)) {
          s.occupiedSeats.forEach((seat) => {
            if (seat > 0) occupiedSeats.add(seat - 1);
          });
        }
      });
      this.seatStatuses = this.updateOccupiedSeats(this.seatStatuses, occupiedSeats);
    }
  }

  updateOccupiedSeats(seatMatrix: SeatStatusType[][], occupied: Set<number>): SeatStatusType[][] {
    let lastSeatIndex: number = 0;
    return seatMatrix.map((car) =>
      car.map((seat) => {
        lastSeatIndex++;
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
        error: (err) => console.error(err)
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
    this.seatStatuses = this.seatStatuses.map((car) => car.map((s) => (s === 'selected' ? 'free' : s)));
    this.seatStatuses[carriageIndex][seatIndex] = 'selected';
    this.bookingService.updateBooking(carriageIndex, seatIndex, this.getPriceForSegments(this.rideData!.carriages[carriageIndex]));
    this.openBookModal();
  }

  openBookModal() {
    this.isBookModalVisible = true;
  }

  closeModal() {
    this.isBookModalVisible = false;
  }
}
