import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatCardModule } from '@angular/material/card';
import { OrdersListItemComponent } from './components/orders-list-item/orders-list-item.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OrdersComponent, OrdersListComponent, OrdersListItemComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule]
})
export class OrdersModule {}
