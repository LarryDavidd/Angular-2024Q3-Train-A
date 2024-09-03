import { Component, inject, OnInit } from '@angular/core';
import { RoutesListComponent } from '../../components/routes-list/routes-list.component';
import { MatButton } from '@angular/material/button';
import { CreateSectionComponent } from '../../components/create-section/create-section.component';
import { CommonModule } from '@angular/common';
import { IRoute } from 'admin/routes/model/routes.model';
import * as StationsActions from 'admin/stations/station-redux/actions/stations.actions';
import * as CarriagesActions from 'admin/carriages/carriages-redux/actions/carriages.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [RoutesListComponent, MatButton, CreateSectionComponent, CommonModule],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss'
})
export class RoutesPageComponent implements OnInit {
  isCreateSectionOpen = false;

  routeForUpdate: IRoute | null = null;

  private store = inject(Store);

  deleteRouteForUpdate() {
    this.routeForUpdate = null;
  }

  openCloseCreateSection() {
    this.isCreateSectionOpen = !this.isCreateSectionOpen;
  }

  onUpdate(route: IRoute) {
    this.routeForUpdate = route;
    this.openCloseCreateSection();
  }

  ngOnInit(): void {
    this.store.dispatch(StationsActions.fetchStations());
    this.store.dispatch(CarriagesActions.fetchCarriages());
  }
}
