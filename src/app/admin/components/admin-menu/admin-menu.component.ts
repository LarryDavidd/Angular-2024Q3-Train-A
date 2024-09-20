import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatMenuModule, MatListModule, MatButton, MatTabsModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {
  private router = inject(Router);

  private route = inject(ActivatedRoute);

  toCarriages() {
    this.router.navigate(['carriages'], { relativeTo: this.route });
  }

  toStations() {
    this.router.navigate(['stations'], { relativeTo: this.route });
  }

  toRoutes() {
    this.router.navigate(['routes'], { relativeTo: this.route });
  }
}
