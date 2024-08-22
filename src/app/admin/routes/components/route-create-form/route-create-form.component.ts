import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-route-create-form',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './route-create-form.component.html',
  styleUrl: './route-create-form.component.scss'
})
export class RouteCreateFormComponent {
  @Input() itemsList!: string[];

  form = new FormGroup({
    select: new FormArray([new FormControl('', [Validators.required])])
  });

  addSelectField() {
    this.form.controls.select.push(new FormControl('', [Validators.required]));
  }

  reset() {
    this.form.reset();
    this.form.controls.select.clear();
    this.addSelectField();
  }
}
