import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatListModule, MatDividerModule, MatButtonModule]
})
export class UserProfileModule {}
