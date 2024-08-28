import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CarriagesComponent } from './pages/carriages/carriages.component';
import { CarriageComponent } from './components/carriage/carriage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { StationsComponent } from './pages/stations/stations.component';
import { StationListComponent } from './components/station-list/station-list.component';
import { StationFormComponent } from './components/station-form/station-form.component';
import { StationMapComponent } from './components/station-map/station-map.component';

@NgModule({
  declarations: [CarriagesComponent, CarriageComponent, StationsComponent, StationListComponent, StationFormComponent, StationMapComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatExpansionModule, MatIconModule, MatSelectModule]
})
export class AdminModule {}
