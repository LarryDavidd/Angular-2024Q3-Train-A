import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin, selectIsAuthenticated } from 'auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

  public isAdmin$ = this.store.select(selectIsAdmin);

  constructor(private readonly store: Store) {}
}
