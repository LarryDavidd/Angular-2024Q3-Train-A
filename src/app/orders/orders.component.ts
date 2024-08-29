import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './models/order';
import { MOCK_ORDERS } from './mock';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  public readonly orders: Order[] = [];

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(): void {
    this.ordersService.getOrders().subscribe(
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
