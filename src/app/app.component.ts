import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteCardComponent } from 'admin/routes/components/route-card/route-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouteCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
