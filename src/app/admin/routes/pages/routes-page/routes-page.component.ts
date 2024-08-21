import { Component, inject } from '@angular/core';
import { RoutesListComponent } from '../../components/routes-list/routes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);

  private route = inject(ActivatedRoute);

  openCreateSection() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
