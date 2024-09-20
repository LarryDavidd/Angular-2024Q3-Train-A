import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './models/order';
import { UserProfileService } from 'user-profile/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];

  public isManager: boolean = false;

  public isChecked = false;

  private isUpdateCancelledOrders!: Subscription;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userProfileService.getProfile().subscribe((data) => {
      if (data.role === 'manager') {
        this.isManager = true;
      }
    });

    this.getOrders();

    this.isUpdateCancelledOrders = this.ordersService.isUpdateOrders$.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getOrders();
      }
    });
  }

  public ngOnDestroy(): void {
    this.isUpdateCancelledOrders.unsubscribe();
  }

  public getOrders(): void {
    this.orders = [];

    const all = this.isManager && this.isChecked ? true : false;

    this.ordersService.getOrders(all).subscribe(
      (data) => {
        const sortedData = this.sortOrders(data);

        this.orders.push(...sortedData);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    );
  }

  private sortOrders(data: Order[]): Order[] {
    return data.sort((a, b) => {
      const startTimeA = new Date(a.schedule.segments[0].time[0]).getTime();
      const startTimeB = new Date(b.schedule.segments[0].time[0]).getTime();
      return startTimeA - startTimeB;
    });
  }
}
