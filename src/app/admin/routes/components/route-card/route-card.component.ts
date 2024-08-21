import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IRoute } from 'admin/routes/model/routes.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss'
})
export class RouteCardComponent {
  @Input() route!: IRoute;
}
