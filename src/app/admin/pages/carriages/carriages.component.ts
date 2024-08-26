import { Component, OnInit } from '@angular/core';
import { Carriage } from 'admin/models/carriages.model';
import { CarriagesService } from 'admin/services/carriages.service';

@Component({
  selector: 'app-carriages',
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss'
})
export class CarriagesComponent implements OnInit {
  carriages: Carriage[] = [];

  isFormVisible = false;

  isEditing = false;

  carriageForm: Carriage = { name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };

  constructor(private carriagesService: CarriagesService) {}

  ngOnInit(): void {
    this.loadCarriages();
  }

  loadCarriages(): void {
    this.carriagesService.getCarriages().subscribe((carriages) => {
      this.carriages = carriages;
      console.log(carriages);
    });
  }

  showCreateForm(): void {
    this.isFormVisible = true;
    this.isEditing = false;
  }

  // editCarriage(carriage: Carriage): void {
  //   this.isFormVisible = true;
  //   this.isEditing = true;
  //   this.carriageForm = { ...carriage };
  // }

  onSubmit(): void {
    console.log('submit', this.carriageForm);
    if (this.isEditing) {
      this.carriagesService.updateCarriage(this.carriageForm).subscribe(() => this.loadCarriages());
    } else {
      this.carriagesService.createCarriage(this.carriageForm).subscribe(() => this.loadCarriages());
    }
    this.isFormVisible = false;
  }

  // resetForm(): void {
  //   this.carriageForm = { id: 0, name: '', rows: 0, leftSeats: 0, rightSeats: 0, code: '' };
  // }
}
