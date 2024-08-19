import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from 'auth/auth.module';
import { AppRoutingModule } from 'app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [AuthModule, AppRoutingModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
