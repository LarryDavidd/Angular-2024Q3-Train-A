import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { Carriage } from 'admin/carriages/model/carriages.model';
import { CarriagesService } from 'admin/carriages/services/carriages.service';
import { CarriageComponent } from '../components/carriage/carriage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CarriageComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './carriages.component.html'
})
export class CarriagesComponent implements OnInit {
  @ViewChild('expansionPanel') expansionPanel!: MatExpansionPanel;

  @ViewChild('formContainer') formContainer!: ElementRef;

  carriages: Carriage[] = [];

  isEditing = false;

  carriageForm: Carriage = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };

  errorMessage = '';

  constructor(private carriagesService: CarriagesService) {}

  ngOnInit(): void {
    this.loadCarriages();
  }

  loadCarriages(): void {
    this.carriagesService.getCarriages().subscribe({
      next: (carriages) => {
        this.carriages = carriages;
      },
      error: (err) => this.handleError(err)
    });
  }

  toggleCreateForm(panel: MatExpansionPanel): void {
    if (panel.opened) {
      panel.close();
      return;
    }

    panel.open();
    this.isEditing = false;
    this.carriageForm = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };
  }

  editCarriage(carriage: Carriage, panel: MatExpansionPanel): void {
    panel.open();
    this.isEditing = true;
    this.carriageForm = { ...carriage };
    this.scrollToForm();
  }

  scrollToForm(): void {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onSubmit(panel: MatExpansionPanel): void {
    if (this.carriageForm.leftSeats < 1 || this.carriageForm.rightSeats < 1 || this.carriageForm.rows < 1 || this.carriageForm.name === '') {
      this.handleError('Please fill in all required fields');
      return;
    }
    if (this.isEditing) {
      this.carriagesService.updateCarriage(this.carriageForm).subscribe({
        next: () => {
          this.loadCarriages();
          this.resetForm();
          panel.close();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.carriagesService.createCarriage(this.carriageForm).subscribe({
        next: () => {
          this.loadCarriages();
          this.resetForm();
          panel.close();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    }
  }

  resetForm(): void {
    this.carriageForm = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };
    this.isEditing = false;
  }

  handleError(error: string): void {
    this.errorMessage = error;
    console.error(error);
  }
}
