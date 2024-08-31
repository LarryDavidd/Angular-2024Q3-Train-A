import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'auth/auth.service';
import { emailValidator } from 'auth/helpers/email-validator';
import { UserProfileService } from './user-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  public profileForm: FormGroup;

  public isEditing: { [key: string]: boolean } = {};

  public role: 'manager' | 'user' = 'user';

  readonly password = signal('');

  private snackBar = inject(MatSnackBar);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userProfileService: UserProfileService,
    private readonly cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      name: ['']
    });
  }

  ngOnInit() {
    this.getProfileData();
  }

  public getProfileData() {
    this.userProfileService.getProfile().subscribe(
      (userData) => {
        this.profileForm.patchValue({
          email: userData.email,
          name: userData.name
        });

        this.role = userData.role;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  public toggleEdit(field: string) {
    this.isEditing[field] = this.isEditing[field] ? !this.isEditing[field] : true;
  }

  public saveUserData(field: string): void {
    this.toggleEdit(field);

    const data = this.profileForm.get(field)?.value;
    const updateData = { [field]: data };

    this.userProfileService.updateUser(updateData).subscribe({
      next: (_response) => {
        this.getProfileData();
      },
      error: (error) => {
        if (error.status === 400) {
          this.profileForm.get('email')?.setErrors({ emailExists: true });
        }
      }
    });

    this.cdr.markForCheck();
  }

  public logout() {
    this.userProfileService.terminateSession();

    this.authService.logout();
  }

  public openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((newPassword: string) => {
      if (newPassword) {
        this.userProfileService.updatePassword(newPassword).subscribe({
          next: (_response) => {
            this.snackBar.open('Password successfully updated!', 'close');
          },
          error: (_error) => {}
        });
      }
    });
  }
}
