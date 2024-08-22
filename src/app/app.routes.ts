import { Routes } from '@angular/router';
import { LoginComponent } from 'auth/components/login/login.component';
import { SignUpComponent } from 'auth/components/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: LoginComponent }
];
