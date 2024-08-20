import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RouteCardComponent } from './components/route-card/route-card.component';

const routes: Route[] = [
  {
    path: 'routes',
    component: RouteCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
