import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { StationsComponent } from './pages/stations/stations.component';
import { StationListComponent } from './components/station-list/station-list.component';

@NgModule({
  declarations: [StationsComponent, StationListComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, MatIconModule]
})
export class AdminModule {}
