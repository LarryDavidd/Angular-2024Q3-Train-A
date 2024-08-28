import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AdminRoutingModule } from './admin-routing.module';
import { StationsComponent } from './pages/stations/stations.component';
import { StationListComponent } from './components/station-list/station-list.component';
import { StationFormComponent } from './components/station-form/station-form.component';
import { StationMapComponent } from './components/station-map/station-map.component';

@NgModule({
  declarations: [StationsComponent, StationListComponent, StationFormComponent, StationMapComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class AdminModule {}
