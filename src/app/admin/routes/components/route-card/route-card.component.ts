import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IRoute } from 'admin/routes/model/routes.model';
import { MatIcon } from '@angular/material/icon';
import * as RoutesActions from 'admin/routes/redux/actions/routes.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'admin/components/delete-dialog/delete-dialog.component';
import { selectStations, selectStationsLoadingStatus } from 'admin/stations/station-redux/selectiors/stations.selectors';
import { selectCarriages, selectCarriagesLoadingStatus } from 'admin/carriages/carriages-redux/selectors/carriages.selectors';
import { GetStationsResponse } from 'admin/stations/model/station.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CarriagesResponse } from 'admin/carriages/model/carriages.model';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon, MatProgressSpinner],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss'
})
export class RouteCardComponent {
  @Input() route!: IRoute;

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  private dialog = inject(MatDialog);

  @Output() handleUpdate = new EventEmitter<IRoute>();

  private store = inject(Store);

  isLoadingStations$ = this.store.select(selectStationsLoadingStatus);

  stations$ = this.store.select(selectStations);

  isLoadingCarriages$ = this.store.select(selectCarriagesLoadingStatus);

  carriages$ = this.store.select(selectCarriages);

  getStations(stations: GetStationsResponse) {
    const routeStations = this.route.path.map((routePath) => {
      return stations.find((station) => station.id === routePath);
    });
    if (routeStations) {
      return routeStations.map((station) => station?.city);
    } else {
      return this.route.path;
    }
  }

  getCarriages(carriages: CarriagesResponse) {
    const routeCarriages = this.route.carriages.map((routeCarriage) => {
      return carriages.find((carriage) => carriage.code === routeCarriage);
    });
    if (routeCarriages) {
      return routeCarriages.map((carriage) => carriage?.name);
    } else {
      return this.route.carriages;
    }
  }

  onDelete() {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '250px'
      })
      .afterClosed()
      .subscribe((data: boolean) => {
        if (data) {
          this.store.dispatch(RoutesActions.deleteRoute({ id: this.route.id }));
        }
      });
  }

  onUpdate() {
    this.handleUpdate.emit(this.route);
  }

  onRedirect() {
    this.router.navigate([this.route.id], { relativeTo: this.activatedRoute });
  }
}
