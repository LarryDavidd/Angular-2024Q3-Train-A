import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CarriagesComponent } from './pages/carriages/carriages.component';

@NgModule({
  declarations: [CarriagesComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule]
})
export class AdminModule {}
