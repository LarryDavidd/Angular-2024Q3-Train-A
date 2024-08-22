import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStations, selectStationsLoadingStatus } from 'admin/stations/station-redux/selectiors/stations.selectors';
import * as StationsActions from 'admin/stations/station-redux/actions/stations.actions';
import * as CarriagesActions from 'admin/carriages/carriages-redux/actions/carriages.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { selectCarriages, selectCarriagesLoadingStatus } from 'admin/carriages/carriages-redux/selectors/carriages.selectors';
import { RouteCreateFormComponent } from '../route-create-form/route-create-form.component';
import { StationsFormGroupComponent } from '../stations-form-group/stations-form-group.component';

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, RouteCreateFormComponent, StationsFormGroupComponent],
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.scss'
})
export class CreateSectionComponent implements OnInit {
  private readonly store = inject(Store);

  isLoadingStations$ = this.store.select(selectStationsLoadingStatus);

  stations$ = this.store.select(selectStations);

  isLoadingCarriages$ = this.store.select(selectCarriagesLoadingStatus);

  carriages$ = this.store.select(selectCarriages);

  ngOnInit(): void {
    this.store.dispatch(StationsActions.fetchStations());
    this.store.dispatch(CarriagesActions.fetchCarriages());
  }
}
