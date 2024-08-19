import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './components/sign-up/sign-up.module';

@NgModule({
  imports: [CommonModule, SignUpModule]
})
export class AuthModule {}
