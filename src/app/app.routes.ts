import { Routes } from '@angular/router';
import { AuthGuard } from 'auth/auth.guard';
import { LoginComponent } from 'auth/components/login/login.component';
import { SignUpComponent } from 'auth/components/sign-up/sign-up.component';
// import { HomeComponent } from 'home/home.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) }
  // { path: '', component: HomeComponent }
];
