import { Routes } from '@angular/router';
import { AuthGuard } from 'auth/auth.guard';
import { LoginComponent } from 'auth/components/login/login.component';
import { SignUpComponent } from 'auth/components/sign-up/sign-up.component';
import { TripComponent } from 'trip/pages/trip/trip.component';
// import { HomeComponent } from 'home/home.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'trip/:rideId', component: TripComponent }
  // { path: '', component: HomeComponent }
];
