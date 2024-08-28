import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IRoute } from 'admin/routes/model/routes.model';
import { MatIcon } from '@angular/material/icon';
import * as RoutesActions from 'admin/routes/redux/actions/routes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss'
})
export class RouteCardComponent {
  @Input() route!: IRoute;

  @Output() handleUpdate = new EventEmitter<IRoute>();

  private store = inject(Store);

  onDelete() {
    this.store.dispatch(RoutesActions.deleteRoute({ id: this.route.id }));
  }

  onUpdate() {
    this.handleUpdate.emit(this.route);
  }
}
