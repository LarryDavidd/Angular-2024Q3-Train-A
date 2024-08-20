import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from 'admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AdminModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
