import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from 'admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AdminModule, BrowserModule, HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
