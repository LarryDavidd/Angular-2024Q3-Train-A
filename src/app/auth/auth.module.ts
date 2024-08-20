import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './components/sign-up/sign-up.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, SignUpModule, HttpClientModule]
})
export class AuthModule {}
