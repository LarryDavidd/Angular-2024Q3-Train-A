import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RoutesPageComponent } from './routes/pages/routes-page/routes-page.component';

const routes: Route[] = [
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
