import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CarriagesService } from 'admin/carriages/services/carriages.service';
import { StationsService } from 'admin/stations/services/stations.service';
import { Subject, takeUntil } from 'rxjs';
import { InfoModalComponent } from 'trip/components/info-modal/info-modal.component';
import { RouteModalComponent } from 'trip/components/route-modal/route-modal.component';
import transformDate from 'trip/helpers/transformDate';
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

  fromStationName: string | undefined;

  toStationName: string | undefined;

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
    private stationsService: StationsService,
    private carriagesService: CarriagesService,
    private modal: MatDialog,
    private snackBar: MatSnackBar
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
            this.getStations();
          },
          error: (err) => console.error(err)
        });
    }
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
    const getCarriageByCode = (carriageCode: string) => this.listOfCarriages.find((c) => c.code === carriageCode);

    if (this.rideData) {
      this.seatStatuses = this.rideData.carriages.map((c) => {
        const carriage = getCarriageByCode(c);
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
    return transformDate(dateStr);
  }

  openRouteModal() {
    this.modal.open(RouteModalComponent, {
      data: {
        rideId: this.rideData!.rideId,
        routeId: this.rideData!.routeId,
        path: this.rideData?.path,
        segments: this.rideData?.schedule.segments,
        fromStationId: this.fromStationId,
        toStationId: this.toStationId
      }
    });
  }

  getStations() {
    this.stationsService
      .getStations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stations) => {
          this.listOfStations = stations;
          this.fromStationName = this.getStationName(this.fromStationId!);
          this.toStationName = this.getStationName(this.toStationId!);
        }
      });
  }

  getStationName(id: number) {
    return this.listOfStations.find((station) => station.id === id)?.city;
  }

  getCarriages() {
    this.carriagesService
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
    const price = this.getPriceForSegments(carriage.code);
    const freeSeats = this.rideData!.carriages.reduce((acc, c, i) => (c === carriage.code ? acc + this.getFreeSeats(i) : acc), 0);

    return `Carriage type ${carriage.code}: ${freeSeats} | $${(price / 100).toFixed(2)}`;
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

  onBookingSuccess(bookedSeat: { carNumber: number; seatNumber: number }) {
    this.seatStatuses[bookedSeat.carNumber][bookedSeat.seatNumber] = 'occupied';
    this.closeModal();
    this.snackBar.open('Trip booked successfully', 'Close', { duration: 3000 });
  }
}
