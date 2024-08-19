import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  imports: [CommonModule, FormsModule, SignUpModule]
})
export class AuthModule {}
