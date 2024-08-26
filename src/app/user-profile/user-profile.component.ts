import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'auth/auth.service';
import { emailValidator } from 'auth/helpers/email-validator';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  public profileForm: FormGroup;

  public isEditing: { [key: string]: boolean } = {};

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userProfileService: UserProfileService
  ) {
    this.profileForm = this.fb.group({
      email: ['', [emailValidator]],
      name: ['']
    });
  }

  ngOnInit() {
    this.userProfileService.getProfile().subscribe(
      (userData) => {
        this.profileForm.patchValue({
          email: userData.email,
          name: userData.name
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  public toggleEdit(field: string) {
    this.isEditing[field] = this.isEditing[field] ? !this.isEditing[field] : true;

    console.log('isEditing', this.isEditing);
  }

  public saveFieldData(field: string) {
    this.toggleEdit(field);

    console.log('saveFieldData');
  }

  public logout() {
    this.authService.logout();
  }
}
