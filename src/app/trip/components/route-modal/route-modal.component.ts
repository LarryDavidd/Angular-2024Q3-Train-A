import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss'
})
export class RouteModalComponent {}
