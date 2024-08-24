import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emailValidator } from 'auth/helpers/email-validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  public profileForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', [emailValidator]],
      name: ['']
    });
  }
}
