import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-route-create-form',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule],
  templateUrl: './route-create-form.component.html',
  styleUrl: './route-create-form.component.scss'
})
export class RouteCreateFormComponent {
  @Input() itemsList!: string[];

  form = new FormGroup({
    select: new FormArray([new FormControl('', [Validators.required])])
  });

  get selectArray(): FormArray {
    return this.form.get('select') as FormArray;
  }

  addSelectField() {
    this.selectArray.push(new FormControl('', [Validators.required]));
  }

  reset() {
    this.form.reset();
    this.selectArray.clear();
    this.addSelectField(); // Добавляем одно поле после сброса
  }
}
