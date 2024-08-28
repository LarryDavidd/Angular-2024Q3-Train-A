import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from 'auth/auth.module';
import { UserProfileModule } from 'user-profile/user-profile.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthModule, CommonModule, RouterOutlet, UserProfileModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
