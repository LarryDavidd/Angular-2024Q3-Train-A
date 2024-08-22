import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './components/sign-up/sign-up.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './components/login/login.module';

@NgModule({
  imports: [CommonModule, SignUpModule, HttpClientModule, LoginModule]
})
export class AuthModule {}
