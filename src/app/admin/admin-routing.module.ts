import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarriagesComponent } from './carriages/pages/carriages.component';
import { StationsComponent } from './pages/stations/stations.component';
import { RoutesPageComponent } from './routes/pages/routes-page/routes-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'carriages', pathMatch: 'full' },
      { path: 'carriages', component: CarriagesComponent },
      { path: 'stations', component: StationsComponent },
      { path: 'routes', component: RoutesPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
