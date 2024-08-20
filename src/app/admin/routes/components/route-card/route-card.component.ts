import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RoutesActions from 'admin/routes/redux/actions/routes.actions';
import { selectLoadingStatus, selectRoutes } from 'admin/routes/redux/selectors/routes.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss'
})
export class RouteCardComponent implements OnInit {
  private readonly store = inject(Store);

  isLoading$ = this.store.select(selectLoadingStatus);

  cards$ = this.store.select(selectRoutes);

  ngOnInit(): void {
    this.store.dispatch(RoutesActions.fetchRoutes());
  }
}
