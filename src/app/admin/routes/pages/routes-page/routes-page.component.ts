import { Component } from '@angular/core';
import { RoutesListComponent } from '../../components/routes-list/routes-list.component';
import { MatButton } from '@angular/material/button';
import { CreateSectionComponent } from '../../components/create-section/create-section.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [RoutesListComponent, MatButton, CreateSectionComponent, CommonModule],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss'
})
export class RoutesPageComponent {
  isCreateSectionOpen = false;

  openCloseCreateSection() {
    this.isCreateSectionOpen = !this.isCreateSectionOpen;
  }

  onUpdate() {
    console.log('onUpdate');
  }
}
