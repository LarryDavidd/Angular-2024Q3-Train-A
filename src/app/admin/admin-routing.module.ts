import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarriagesComponent } from './pages/carriages/carriages.component';

const routes: Routes = [{ path: 'carriages', component: CarriagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
