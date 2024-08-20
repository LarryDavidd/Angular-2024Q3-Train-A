import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'auth/auth.service';
import { passwordValidator } from 'auth/helpers/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      repeatPassword: ['', [Validators.required, passwordValidator]]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;

      this.authService.signUp(email, password);
    }
  }
}
