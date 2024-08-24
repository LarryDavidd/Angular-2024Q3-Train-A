import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { emailValidator } from 'auth/helpers/email-validator';
import { passwordValidator } from 'auth/helpers/password-validator';
import { spaceValidator } from 'auth/helpers/space-validator';

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
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, spaceValidator, passwordValidator]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isSubmitDisabled = Object.values(this.loginForm.value).some(
        (val) => val !== ''
      );
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
        }
      });
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
