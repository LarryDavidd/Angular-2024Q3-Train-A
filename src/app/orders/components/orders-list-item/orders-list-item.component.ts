import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order, OrderStatus } from 'orders/models/order';
import { OrderCancelDialogComponent } from '../order-cancel-dialog/order-cancel-dialog.component';
import { StationsService } from 'admin/stations/services/stations.service';
import { Station } from 'admin/stations/model/station.model';
import { CarriageData } from 'orders/models/carriage-data';
import { CarriagesService } from 'admin/carriages/services/carriages.service';
import { Carriage } from 'admin/carriages/model/carriages.model';
import { findCarriageAndSeat } from 'orders/helpers/find-carriage-data';
import { formatDate } from 'orders/helpers/format-date';
import { calculateTimeDifference } from 'orders/helpers/calculate-time-difference';
import { formatPrice } from 'orders/helpers/format-price';
import { UserProfileService } from 'user-profile/user-profile.service';
import { User } from 'user-profile/models/users';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrl: './orders-list-item.component.scss'
})
export class OrdersListItemComponent implements OnInit {
  @Input() public data!: Order;

  @Input() public isAdmin!: boolean;

  public isActive!: boolean;

  public priceLabel!: string;

  public tripTimeRangeLabels!: [departureDate: string, arriveDate: string];

  public tripDurationLabel!: string;

  public stations!: Station[];

  public from!: string | '';

  public to!: string | '';

  public carriageData: CarriageData | undefined;

  public carriages!: Carriage[];

  public users!: User[];

  public segmentStartIndex!: number;

  public segmentEndIndex!: number;

  constructor(
    public dialog: MatDialog,
    private readonly stationService: StationsService,
    private readonly carriagesService: CarriagesService,
    private readonly userProfileService: UserProfileService
  ) {}

  public ngOnInit(): void {
    this.segmentStartIndex = this.data.path.indexOf(this.data.stationStart);
    this.segmentEndIndex = this.data.path.indexOf(this.data.stationEnd) - 1;

    this.isActive = this.data.status === OrderStatus.Active;

    this.initTime();
    this.getStations();
    this.getCarriages();
    this.getIsAdmin();

    forkJoin({
      stations: this.getStations()
    }).subscribe({
      next: (res) => {
        this.handleStationsData(res);
        this.priceLabel = formatPrice(this.calculateTotalPrice());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private handleStationsData(results: { stations: Station[] }): void {
    this.stations = results.stations;
    this.from = this.stations.find((s) => s.id === this.data.stationStart)!.city || '';
    this.to = this.stations.find((s) => s.id === this.data.stationEnd)!.city || '';
  }

  public getIsAdmin() {
    this.userProfileService.getProfile().subscribe((data) => {
      if (data.role === 'manager') {
        this.isAdmin = true;

        this.getUsers();
      }
    });
  }

  public getUsers() {
    this.userProfileService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  public getStations() {
    return this.stationService.getStations();
  }

  public getCarriages() {
    this.carriagesService.getCarriages().subscribe((carriages) => {
      this.carriages = carriages;

      // TODO: check seats
      this.carriageData = findCarriageAndSeat(this.data.carriages, this.carriages, this.data.seatId) || {
        carriageNumber: 1,
        seatNumber: this.data.seatId,
        carriageCode: this.data.carriages[0]
      };
    });
  }

  public calculateTotalPrice(): number {
    let totalPrice = 0;

    if (this.data.schedule && this.data.schedule.segments) {
      this.data.schedule.segments.forEach((segment, ind) => {
        if (ind >= this.segmentStartIndex && ind <= this.segmentEndIndex) {
          totalPrice += segment.price[this.carriageData!.carriageCode] || 0;
        }
      });
    }

    return totalPrice;
  }

  public onPromptCancel(): void {
    const customerName = this.isAdmin ? this.users.find((user) => user.id === this.data.userId)?.name : '';

    this.dialog.open(OrderCancelDialogComponent, {
      data: {
        orderId: this.data.id,
        isAdmin: this.isAdmin,
        customerName
      }
    });
  }

  private initTime(): void {
    const NO_DATA_PLACEHOLDER = 'N/A';

    const firstSegment = this.data.schedule.segments[this.segmentStartIndex];
    const lastSegment = this.data.schedule.segments[this.segmentEndIndex];

    const startTime = firstSegment?.time[0];
    const endTime = lastSegment?.time[1];

    this.tripTimeRangeLabels = [startTime ? formatDate(startTime) : NO_DATA_PLACEHOLDER, endTime ? formatDate(endTime) : NO_DATA_PLACEHOLDER];

    this.tripDurationLabel = startTime && endTime ? calculateTimeDifference(startTime, endTime) : NO_DATA_PLACEHOLDER;
  }
}
