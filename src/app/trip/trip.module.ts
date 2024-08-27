import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './pages/trip/trip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: TripComponent }];

@NgModule({
  declarations: [TripComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatMenuModule, MatIconModule]
})
export class TripModule {}
