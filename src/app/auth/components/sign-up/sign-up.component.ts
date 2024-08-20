import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { emailValidator } from 'auth/helpers/email-validator';
import { passwordMatchValidator } from 'auth/helpers/password-match-validator';
import { passwordValidator } from 'auth/helpers/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  public isFirstClick = false;

  public isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, passwordValidator]],
        repeatPassword: ['', [Validators.required, passwordValidator]]
      },
      { validator: passwordMatchValidator }
    );
  }

  public onSubmit(): void {
    if (!this.isFirstClick) {
      this.isFirstClick = true;
    }

    if (this.signUpForm.valid) {
      this.isLoading = true;

      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;

      this.authService.signUp(email, password).subscribe((data) => {
        if (!data.success && data.reason === 'invalidUniqueKey') {
          this.signUpForm.get('email')?.setErrors({ emailExists: true });

          this.isLoading = false;
        } else {
          this.navigateTo('signin');
        }
      });
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
