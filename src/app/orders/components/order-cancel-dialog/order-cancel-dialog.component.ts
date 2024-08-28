import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'orders/models/order';
import { OrdersService } from 'orders/orders.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-cancel-dialog.component.html',
  styleUrl: './order-cancel-dialog.component.scss'
})
export class OrderCancelDialogComponent {
  private readonly data = inject<{ orderId: Order['id'] }>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<OrderCancelDialogComponent>);

  private readonly snackBar = inject(MatSnackBar);

  constructor(private readonly ordersService: OrdersService) {}

  public onConfirm(): void {
    this.dialogRef.close();

    this.ordersService.cancelOrder(this.data.orderId).subscribe(
      (data) => {
        this.snackBar.open(data.success ? 'Order successfully canceled' : data.error!.message, 'Close');
      },
      (_error) => {
        this.snackBar.open('Unknown error', 'Close');
      }
    );
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
