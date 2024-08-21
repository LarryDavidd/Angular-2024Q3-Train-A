import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RoutesActions from 'admin/routes/redux/actions/routes.actions';
import { selectLoadingStatus, selectRoutes } from 'admin/routes/redux/selectors/routes.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouteCardComponent } from '../route-card/route-card.component';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatCardModule, RouteCardComponent],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.scss'
})
export class RoutesListComponent implements OnInit {
  private readonly store = inject(Store);

  isLoading$ = this.store.select(selectLoadingStatus);

  cards$ = this.store.select(selectRoutes);

  ngOnInit(): void {
    this.store.dispatch(RoutesActions.fetchRoutes());
  }
}
