import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './models/order';
import { MOCK_ORDERS } from './mock';
import { UserProfileService } from 'user-profile/user-profile.service';
import { User } from 'user-profile/models/users';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];

  public isManager: boolean = false;

  public isChecked = false;

  public users!: User[];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userProfileService.getProfile().subscribe((data) => {
      if (data.role === 'manager') {
        this.isManager = true;

        this.getUsers();
      }
      console.log('profile', data);
    });

    this.getOrders();
  }

  public getUsers() {
    this.userProfileService.getUsers().subscribe((data) => {
      this.users = data;

      console.log('users', data);
    });
  }

  public getOrders(): void {
    this.orders = [];

    const all = this.isManager && this.isChecked ? true : false;

    this.ordersService.getOrders(all).subscribe(
      (data) => {
        const sortedData = this.sortOrders(data);

        this.orders.push(...sortedData, ...this.sortOrders(MOCK_ORDERS), ...this.sortOrders(MOCK_ORDERS));
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
