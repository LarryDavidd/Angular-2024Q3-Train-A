import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutesListComponent } from './admin/routes/components/routes-list/routes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoutesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
