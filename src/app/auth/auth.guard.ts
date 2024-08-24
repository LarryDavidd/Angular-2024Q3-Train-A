import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  private isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
