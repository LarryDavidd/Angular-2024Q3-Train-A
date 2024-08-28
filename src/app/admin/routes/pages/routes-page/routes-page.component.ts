import { Component } from '@angular/core';
import { RoutesListComponent } from '../../components/routes-list/routes-list.component';
import { MatButton } from '@angular/material/button';
import { CreateSectionComponent } from '../../components/create-section/create-section.component';
import { CommonModule } from '@angular/common';
import { IRoute } from 'admin/routes/model/routes.model';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [RoutesListComponent, MatButton, CreateSectionComponent, CommonModule],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss'
})
export class RoutesPageComponent {
  isCreateSectionOpen = false;

  routeForUpdate: IRoute | null = null;

  deleteRouteForUpdate() {
    this.routeForUpdate = null;
  }

  openCloseCreateSection() {
    this.isCreateSectionOpen = !this.isCreateSectionOpen;
  }

  onUpdate(route: IRoute) {
    this.routeForUpdate = route;
    this.openCloseCreateSection();
  }
}
