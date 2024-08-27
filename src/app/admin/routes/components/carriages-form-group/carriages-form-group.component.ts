import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarriagesResponse } from 'admin/carriages/model/carriages.model';

@Component({
  selector: 'app-carriages-form-group',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatOption, MatInputModule, MatButton, MatSelect],
  templateUrl: './carriages-form-group.component.html',
  styleUrl: './carriages-form-group.component.scss'
})
export class CarriagesFormGroupComponent implements OnDestroy {
  @Input() carriages!: CarriagesResponse;

  @Output() setSelectedCarriagesCodes = new EventEmitter<string[]>();

  form = new FormGroup({
    select: new FormArray([new FormControl('', [Validators.required])])
  });

  reset() {
    this.form.reset();
    this.form.controls.select.clear();
    this.addSelectField();
  }

  addSelectField() {
    this.form.controls.select.push(new FormControl('', [Validators.required]));
  }

  onChange(i: number): void {
    this.setSelectedCarriagesCodes.emit(this.form.value.select?.filter((value): value is string => value !== null) ?? []);
    if (this.form.controls.select.length === i + 1) this.addSelectField();
  }

  ngOnDestroy(): void {
    this.reset();
  }
}
