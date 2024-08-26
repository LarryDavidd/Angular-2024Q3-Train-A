import { Component, OnInit } from '@angular/core';
import { Carriage } from 'admin/models/carriages.model';
import { CarriagesService } from 'admin/services/carriages.service';

@Component({
  selector: 'app-carriages',
  templateUrl: './carriages.component.html'
})
export class CarriagesComponent implements OnInit {
  carriages: Carriage[] = [];

  isFormVisible = false;

  isEditing = false;

  carriageForm: Carriage = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };

  errorMessage = '';

  constructor(private carriagesService: CarriagesService) {}

  ngOnInit(): void {
    this.loadCarriages();
    this.carriagesService.signupAdmin().subscribe({
      next: (res) => {
        if (res.token) this.carriagesService.token = res.token;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadCarriages(): void {
    this.carriagesService.getCarriages().subscribe((carriages) => {
      this.carriages = carriages;
    });
  }

  showCreateForm(): void {
    this.isFormVisible = true;
    this.isEditing = false;
    this.carriageForm = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };
  }

  editCarriage(carriage: Carriage): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.carriageForm = { ...carriage };
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.carriagesService.updateCarriage(this.carriageForm).subscribe({
        next: () => {
          this.loadCarriages();
          this.isFormVisible = false;
          this.resetForm();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.carriagesService.createCarriage(this.carriageForm).subscribe({
        next: () => {
          this.loadCarriages();
          this.isFormVisible = false;
          this.resetForm();
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
