import { Routes } from '@angular/router';
import { AuthGuard } from 'auth/auth.guard';
import { LoginComponent } from 'auth/components/login/login.component';
import { SignUpComponent } from 'auth/components/sign-up/sign-up.component';
// import { HomeComponent } from 'home/home.component';
import { UserProfileComponent } from 'user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];
