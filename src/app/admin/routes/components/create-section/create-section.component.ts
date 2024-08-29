import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStations, selectStationsLoadingStatus } from 'admin/stations/station-redux/selectiors/stations.selectors';
import * as StationsActions from 'admin/stations/station-redux/actions/stations.actions';
import * as CarriagesActions from 'admin/carriages/carriages-redux/actions/carriages.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { selectCarriages, selectCarriagesLoadingStatus } from 'admin/carriages/carriages-redux/selectors/carriages.selectors';
import { StationsFormGroupComponent } from '../stations-form-group/stations-form-group.component';
import { CarriagesFormGroupComponent } from '../carriages-form-group/carriages-form-group.component';
import { MatButton } from '@angular/material/button';
import { RoutesService } from 'admin/routes/services/routes.service';
import { IRoute } from 'admin/routes/model/routes.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as RoutesActions from 'admin/routes/redux/actions/routes.actions';

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, StationsFormGroupComponent, CarriagesFormGroupComponent, MatButton],
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.scss'
})
export class CreateSectionComponent implements OnInit {
  private readonly store = inject(Store);

  private snackBar = inject(MatSnackBar);

  @Output() closeSection = new EventEmitter();

  @Output() deleteRouteForUpdate = new EventEmitter();

  private routesService = inject(RoutesService);

  @Input() routeForUpdate!: IRoute | null;

  // Stations
  isLoadingStations$ = this.store.select(selectStationsLoadingStatus);

  stations$ = this.store.select(selectStations);

  selectedStationsIds: string[] = [];

  setSelectedStationsIds(ids: string[]) {
    this.selectedStationsIds = ids;
  }

  // Carriages
  isLoadingCarriages$ = this.store.select(selectCarriagesLoadingStatus);

  carriages$ = this.store.select(selectCarriages);

  selectedCarriagesCodes: string[] = [];

  setSelectedCarriagesCodes(codes: string[]) {
    this.selectedCarriagesCodes = codes;
  }

  // Shared
  onSave() {
    if (this.selectedCarriagesCodes.length >= 3 && this.selectedStationsIds.length >= 3) {
      if (this.routeForUpdate) {
        this.routesService
          .updateRoute(String(this.routeForUpdate.id), { carriages: this.selectedCarriagesCodes, path: this.selectedStationsIds.map((value) => Number(value)) })
          .subscribe({
            next: () => {
              this.store.dispatch(RoutesActions.fetchRoutes());
              this.deleteRouteForUpdate.emit();
              this.snackBar.open('Route update successfully', 'close', {
                duration: 3000
              });
            },
            error: (error) => {
              this.snackBar.open('Error update route:' + error, 'close', {
                duration: 3000
              });
            }
          });
      } else {
        this.routesService.createRoute({ carriages: this.selectedCarriagesCodes, path: this.selectedStationsIds.map((value) => Number(value)) }).subscribe({
          next: () => {
            this.store.dispatch(RoutesActions.fetchRoutes());
            this.snackBar.open('Route save successfully', 'close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error save route:' + error, 'close', {
              duration: 3000
            });
          }
        });
      }
      this.closeSection.emit();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(StationsActions.fetchStations());
    this.store.dispatch(CarriagesActions.fetchCarriages());

    if (this.routeForUpdate) {
      this.selectedCarriagesCodes = this.routeForUpdate.carriages;
      this.selectedStationsIds = this.routeForUpdate.path.map((id) => String(id));
    }
  }
}
