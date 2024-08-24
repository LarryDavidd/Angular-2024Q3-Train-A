import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardImage } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatCardImage, HttpClientModule]
})
export class SignUpModule {}
