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
        this.orders.push(...data, ...MOCK_ORDERS);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    );
  }
}
