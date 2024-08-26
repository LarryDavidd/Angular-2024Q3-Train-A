import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CarriagesComponent } from './pages/carriages/carriages.component';
import { CarriageComponent } from './components/carriage/carriage.component';

@NgModule({
  declarations: [CarriagesComponent, CarriageComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule]
})
export class AdminModule {}
