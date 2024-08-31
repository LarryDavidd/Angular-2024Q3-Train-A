import { Routes } from '@angular/router';
import { AuthGuard } from 'auth/auth.guard';
import { LoginComponent } from 'auth/components/login/login.component';
import { SignUpComponent } from 'auth/components/sign-up/sign-up.component';
import { HomeComponent } from 'home/home.component';
import { OrdersComponent } from 'orders/orders.component';
import { UserProfileComponent } from 'user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: async () => (await import('admin/admin.module')).AdminModule,
    canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] }
];
