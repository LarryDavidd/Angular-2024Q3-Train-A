import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'auth/auth.service';
import { emailValidator } from 'auth/helpers/email-validator';
import { passwordValidator } from 'auth/helpers/password-validator';
import { spaceValidator } from 'auth/helpers/space-validator';
import { UserResponse } from 'user-profile/models/user-response';
import { UserProfileService } from 'user-profile/user-profile.service';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;

  public isFirstClick = false;

  public isLoading = false;

  public isSubmitDisabled = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userProfileService: UserProfileService,
    private readonly store: Store,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, spaceValidator, passwordValidator]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isSubmitDisabled = Object.values(this.loginForm.value).some((val) => val !== '');
    });
  }

  public onSubmit(): void {
    if (!this.isFirstClick) {
      this.isFirstClick = true;
    }

    if (this.loginForm.valid) {
      this.isLoading = true;

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.signIn(email, password).subscribe((data) => {
        if (!data.success) {
          this.isLoading = false;

          this.loginForm.get('email')?.setErrors({ incorrect: true });
          this.loginForm.get('password')?.setErrors({ incorrect: true });
        } else {
          this.navigateTo('/');
          this.checkIsAdmin();
        }
      });
    }

    this.cdr.markForCheck();
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  private checkIsAdmin() {
    this.userProfileService.getProfile().subscribe((userResponse: UserResponse) => {
      if (userResponse && userResponse.role === 'manager') {
        this.store.dispatch(AuthActions.setIsAdmin(true));
      } else {
        this.store.dispatch(AuthActions.setIsAdmin(false));
      }
    });
  }
}
