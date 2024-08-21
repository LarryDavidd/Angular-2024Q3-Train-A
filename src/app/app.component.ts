import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutesPageComponent } from './admin/routes/pages/routes-page/routes-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoutesPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
