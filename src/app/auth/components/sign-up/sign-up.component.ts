import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'auth/helpers/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
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

      console.log(email, password);
    }
  }
}
