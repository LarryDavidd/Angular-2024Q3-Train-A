import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { UserResponse } from 'user-profile/models/user-response';
import { UserProfileService } from 'user-profile/user-profile.service';
import { selectIsAdminUpdated } from './store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly userProfileService: UserProfileService
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.isAuthenticated();

    if (state.url === '/') {
      return true;
    }

    if (state.url === '/signin' && isAuthenticated) {
      this.router.navigate(['/']);

      return true;
    } else if (!isAuthenticated && state.url !== '/signin') {
      this.router.navigate(['/signin']);

      return false;
    }

    if (isAuthenticated) {
      this.checkIsAdmin();
    }

    return true;
  }

  private isAuthenticated(): boolean {
    const isAuthenticated = this.authService.isAuthenticatedUser();
    this.store.dispatch(AuthActions.setAuthenticated(isAuthenticated));

    return isAuthenticated;
  }

  private checkIsAdmin() {
    this.store.select(selectIsAdminUpdated).subscribe((isAdminUpdated: boolean) => {
      if (!isAdminUpdated) {
        this.userProfileService.getProfile().subscribe((userResponse: UserResponse) => {
          if (userResponse && userResponse.role === 'manager') {
            this.store.dispatch(AuthActions.setIsAdmin(true));
          }
        });
      }
    });
  }
}
