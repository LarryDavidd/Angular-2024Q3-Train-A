import { NgModule } from '@angular/core';
import { RoutesPageComponent } from './routes/pages/routes-page/routes-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CarriagesComponent } from './pages/carriages/carriages.component';
import { StationsComponent } from './pages/stations/stations.component';

const routes: Routes = [
  { path: 'carriages', component: CarriagesComponent },
  { path: 'stations', component: StationsComponent },
  {
    path: 'routes',
    component: RoutesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
