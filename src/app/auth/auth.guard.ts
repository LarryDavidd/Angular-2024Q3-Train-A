import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/signin' && this.isAuthenticated()) {
      this.router.navigate(['/']);

      return true;
    } else if (!this.isAuthenticated() && state.url !== '/signin') {
      this.router.navigate(['/signin']);

      return false;
    }

    return true;
  }

  private isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }
}
