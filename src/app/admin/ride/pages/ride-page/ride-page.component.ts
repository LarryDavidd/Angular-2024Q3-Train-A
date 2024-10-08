import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RideActions from 'admin/ride/redux/actions/ride.actions';
import { selectRide, selectRidesLoadingStatus } from 'admin/ride/redux/selectors/ride.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResponceBody, ResponceBodySave, Ride } from 'admin/ride/model/ride.model';
import { RideListComponent } from '../../components/ride-list/ride-list.component';
import { RideService } from 'admin/ride/services/ride.service';
import { CreateSectionComponent } from 'admin/ride/components/create-section/create-section.component';
import * as StationsActions from 'admin/stations/station-redux/actions/stations.actions';
import * as CarriagesActions from 'admin/carriages/carriages-redux/actions/carriages.actions';
import { selectCarriages, selectCarriagesLoadingStatus } from 'admin/carriages/carriages-redux/selectors/carriages.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { selectStations } from 'admin/stations/station-redux/selectiors/stations.selectors';

@Component({
  selector: 'app-ride-page',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RideListComponent, CreateSectionComponent, MatButtonModule],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss'
})
export class RidePageComponent implements OnInit {
  store = inject(Store);

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  private snackBar = inject(MatSnackBar);

  isCreateSectionOpen = false;

  redirectToRoutes() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  openCloseCreateSection() {
    this.isCreateSectionOpen = !this.isCreateSectionOpen;
  }

  carriages$ = this.store.select(selectCarriages);

  stations$ = this.store.select(selectStations);

  isLoadingCarriages$ = this.store.select(selectCarriagesLoadingStatus);

  private route = inject(ActivatedRoute);

  private rideService = inject(RideService);

  routeId: string | null = null;

  rides$: Observable<Ride | null> = this.store.select(selectRide);

  isLoading$: Observable<boolean> = this.store.select(selectRidesLoadingStatus);

  updateRide({ rideId, segment }: ResponceBody) {
    if (this.routeId)
      this.rideService.updateRide(Number(this.routeId), rideId, segment).subscribe({
        next: () => {
          this.snackBar.open('Ride updated successfully', 'close', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open('Error updating ride' + error.message, 'close', {
            duration: 3000
          });
        }
      });
  }

  saveRide({ segment }: ResponceBodySave) {
    if (this.routeId)
      this.rideService.saveRide(Number(this.routeId), segment).subscribe({
        next: () => {
          this.isCreateSectionOpen = false;
          if (this.routeId) this.store.dispatch(RideActions.retrieveRide({ id: this.routeId }));
          this.snackBar.open('Ride saved successfully', 'close', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open('Error saving ride' + ' ' + error.message, 'close', {
            duration: 3000
          });
        }
      });
  }

  deleteRide({ rideId }: { rideId: number }) {
    if (this.routeId)
      this.rideService.deleteRide(rideId, this.routeId).subscribe({
        next: () => {
          if (this.routeId) this.store.dispatch(RideActions.retrieveRide({ id: this.routeId }));
          this.snackBar.open('Ride deleted successfully', 'close', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open('Error deleted ride' + ' ' + error.message, 'close', {
            duration: 3000
          });
        }
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.routeId = id;
        this.store.dispatch(RideActions.retrieveRide({ id }));
        this.carriages$.subscribe((value) => {
          if (value === null) {
            this.store.dispatch(CarriagesActions.fetchCarriages());
          }
        });
        this.stations$.subscribe((value) => {
          if (value === null) {
            this.store.dispatch(StationsActions.fetchStations());
          }
        });
      }
    });
  }
}
