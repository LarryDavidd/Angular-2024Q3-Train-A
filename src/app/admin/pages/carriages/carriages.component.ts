import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Carriage } from 'admin/models/carriages.model';
import { CarriagesService } from 'admin/services/carriages.service';

@Component({
  selector: 'app-carriages',
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
