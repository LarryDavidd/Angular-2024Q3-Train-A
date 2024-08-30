import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './pages/trip/trip.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CarriageComponent } from './components/carriage/carriage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HighlightDirective } from './directives/highlight.directive';
import { BookModalComponent } from './components/book-modal/book-modal.component';

const routes: Routes = [{ path: '', component: TripComponent }];

@NgModule({
  declarations: [TripComponent, CarriageComponent, HighlightDirective, CarriageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, MatTabsModule, MatDialogModule, BookModalComponent]
})
export class TripModule {}
