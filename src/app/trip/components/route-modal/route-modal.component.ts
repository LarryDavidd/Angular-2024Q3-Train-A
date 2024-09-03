import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { IRoute } from 'admin/routes/model/routes.model';
import { RouteModalData } from 'trip/models/trip.model';
import { Schedule, TripService } from 'trip/services/trip.service';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss'
})
export class RouteModalComponent implements OnInit {
  private route: IRoute | undefined;

  private rideSchedule: Schedule | undefined;

  // private routeData: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RouteModalData,
    private rideService: TripService // TODO: get from ride service
  ) {}

  ngOnInit(): void {
    this.rideService.getRideById(this.data.routeId).subscribe({
      next: (route) => {
        console.log(route);
        this.rideSchedule = route.schedule.find((s) => s.rideId === this.data.rideId);
      }
    });
  }
}
