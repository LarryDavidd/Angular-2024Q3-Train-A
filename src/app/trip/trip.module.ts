import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './pages/trip/trip.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CarriageComponent } from './components/carriage/carriage.component';

const routes: Routes = [{ path: '', component: TripComponent }];

@NgModule({
  declarations: [TripComponent, CarriageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, MatTabsModule]
})
export class TripModule {}
