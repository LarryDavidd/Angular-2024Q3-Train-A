import { Component } from '@angular/core';
import { RoutesListComponent } from '../../components/routes-list/routes-list.component';
import { MatButton } from '@angular/material/button';
import { CreateSectionComponent } from '../../components/create-section/create-section.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [RoutesListComponent, MatButton, CreateSectionComponent],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss'
})
export class RoutesPageComponent {
  openCreateSection() {
    console.log('open create section');
  }
}
