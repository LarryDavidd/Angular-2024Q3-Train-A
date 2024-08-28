import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarriagesComponent } from './pages/carriages/carriages.component';
import { StationsComponent } from './pages/stations/stations.component';

const routes: Routes = [
  { path: 'carriages', component: CarriagesComponent },
  { path: 'stations', component: StationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
