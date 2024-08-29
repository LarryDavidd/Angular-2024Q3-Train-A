import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order, OrderStatus } from 'orders/models/order';
import { OrderCancelDialogComponent } from '../order-cancel-dialog/order-cancel-dialog.component';
import { StationService } from 'admin/services/station.service';
import { Store } from '@ngrx/store';
import { Station } from 'admin/models/stations.model';
import { ICarriage } from 'admin/carriages/model/carriages.model';
import { CarriageData } from 'orders/models/carriage-data';
import { CarriagesService } from 'admin/services/carriages.service';
import { Carriage } from 'admin/models/carriages.model';
import { OrdersService } from 'orders/orders.service';
import { RoutesService } from 'admin/routes/services/routes.service';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrl: './orders-list-item.component.scss'
})
export class OrdersListItemComponent implements OnInit {
  @Input() public data!: Order;

  public isActive!: boolean;

  public priceLabel!: string;

  public tripTimeRangeLabels!: [departureDate: string, arriveDate: string];

  public tripDurationLabel!: string;

  public stations!: Station[];

  public from!: string | '';

  public to!: string | '';

  public carriageData!: CarriageData;

  public carriages!: Carriage[];

  constructor(
    public dialog: MatDialog,
    private readonly stationService: StationService,
    private readonly carriagesService: CarriagesService,
    private readonly ordersService: OrdersService,
    private readonly routesService: RoutesService,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.ordersService.createOrder();
    this.isActive = this.data.status === OrderStatus.Active;
    this.priceLabel = this.formatPrice(this.calculateTotalPrice());

    this.initTime();
    this.getStations();
    this.getCarriages();

    this.routesService.getRoutes().subscribe((data) => console.log('data', data));
  }

  public getStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;

      this.from = this.getStationName(this.data.path[0]) || '';
      this.to = this.getStationName(this.data.path[this.data.path.length - 1]) || '';
    });
  }

  public getCarriages() {
    this.carriagesService.getCarriages().subscribe((carriages) => {
      this.carriages = carriages;

      this.carriageData = this.findCarriageAndSeat(this.data.carriages, this.carriages, this.data.seatId) || {
        carriageNumber: 1,
        seatNumber: this.data.seatId,
        type: this.data.carriages[0]
      };
    });
  }

  public calculateTotalPrice(): number {
    let totalPrice = 0;

    if (this.data.schedule && this.data.schedule.segments) {
      this.data.schedule.segments.forEach((segment) => {
        totalPrice += segment.price['standard'] || 0;
      });
    }

    return totalPrice;
  }

  public getStationName(id: number): string | undefined {
    return this.stations.find((el) => el.id === id)?.city;
  }

  public onPromptCancel(): void {
    this.dialog.open(OrderCancelDialogComponent, {
      data: {
        orderId: this.data.id
      }
    });
  }

  private initTime(): void {
    const NO_DATA_PLACEHOLDER = 'N/A';

    const firstSegment = this.data.schedule.segments[0];
    const lastSegment = this.data.schedule.segments.at(-1);

    const startTime = firstSegment?.time[0];
    const endTime = lastSegment?.time[1];

    this.tripTimeRangeLabels = [startTime ? this.formatDate(startTime) : NO_DATA_PLACEHOLDER, endTime ? this.formatDate(endTime) : NO_DATA_PLACEHOLDER];

    this.tripDurationLabel = startTime && endTime ? this.calculateTimeDifference(startTime, endTime) : NO_DATA_PLACEHOLDER;
  }

  private formatDate(isoDate: string): string {
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

    const date = new Date(isoDate);
    const month = MONTHS[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${month} ${day} ${hours}:${minutes}`;
  }

  private calculateTimeDifference(isoStartDate: string, isoEndDate: string) {
    const start = new Date(isoStartDate);
    const end = new Date(isoEndDate);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  }

  private formatPrice(number: number): string {
    const str = number.toFixed(2);

    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public findCarriageAndSeat(carriage_codes: string[], carriages: ICarriage[], seatId: number): CarriageData | null {
    let seatCounter = 0;

    for (let i = 0; i < carriage_codes.length; i++) {
      const carriageCode = carriage_codes[i];
      const carriage = carriages.find((c: { code: string }) => c.code === carriageCode);

      if (!carriage) {
        console.log(`Carriage with code ${carriageCode} not found`);

        return null;
      } else {
        const totalSeatsInCarriage = carriage.rows * (carriage.leftSeats + carriage.rightSeats);

        if (seatId <= seatCounter + totalSeatsInCarriage) {
          const seatInCarriage = seatId - seatCounter;
          return {
            carriageNumber: i + 1,
            seatNumber: seatInCarriage,
            type: carriage.name
          };
        }

        seatCounter += totalSeatsInCarriage;
      }
    }

    return null;
  }
}
