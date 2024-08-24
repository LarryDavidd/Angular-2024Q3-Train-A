import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, StationsFormGroupComponent, CarriagesFormGroupComponent, MatButton],
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.scss'
})
export class CreateSectionComponent implements OnInit {
  private readonly store = inject(Store);

  private routesService = inject(RoutesService);

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
    console.log(this.selectedCarriagesCodes, this.selectedStationsIds);
    this.routesService.createRoute({ carriages: this.selectedCarriagesCodes, path: this.selectedStationsIds.map((value) => Number(value)) });
  }

  ngOnInit(): void {
    this.store.dispatch(StationsActions.fetchStations());
    this.store.dispatch(CarriagesActions.fetchCarriages());
  }
}
