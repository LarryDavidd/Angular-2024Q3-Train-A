import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { StationsComponent } from './pages/stations/stations.component';

@NgModule({
  declarations: [StationsComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
