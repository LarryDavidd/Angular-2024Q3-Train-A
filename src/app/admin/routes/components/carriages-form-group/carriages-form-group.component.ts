import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarriagesResponse } from 'admin/carriages/model/carriages.model';

@Component({
  selector: 'app-carriages-form-group',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatOption, MatInputModule, MatButton, MatSelect, MatSelectModule, FormsModule],
  templateUrl: './carriages-form-group.component.html',
  styleUrl: './carriages-form-group.component.scss'
})
export class CarriagesFormGroupComponent implements OnInit, OnDestroy {
  @Input() carriages!: CarriagesResponse;

  @Input() selectedCarriagesCodes!: string[];

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

  getCarriageNameByCode(code: string) {
    return this.carriages.find((carriage) => carriage.code === code);
  }

  onChange(event: MatSelectChange, i: number): void {
    if (this.selectedCarriagesCodes[i]) {
      this.selectedCarriagesCodes[i] = event.value;
      this.setSelectedCarriagesCodes.emit(this.selectedCarriagesCodes);
    } else {
      this.setSelectedCarriagesCodes.emit([...this.selectedCarriagesCodes, event.value]);
    }
    if (this.form.controls.select.length === i + 1) this.addSelectField();
  }

  ngOnInit(): void {
    if (this.selectedCarriagesCodes) {
      this.selectedCarriagesCodes.forEach(() => {
        this.addSelectField();
      });
    }
  }

  ngOnDestroy(): void {
    this.reset();
  }
}
