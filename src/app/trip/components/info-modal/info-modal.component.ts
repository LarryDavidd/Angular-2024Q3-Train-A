import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalData } from 'trip/models/trip.model';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private router: Router,
    private dialogRef: MatDialogRef<InfoModalComponent>
  ) {}

  goToOrders(linkForRedirect: string) {
    if (linkForRedirect) {
      this.router.navigate([linkForRedirect]);
      this.dialogRef.close();
    }
  }
}
