import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Schedule } from 'admin/ride/model/ride.model';

interface SegmentForm {
  arrivalTime: FormControl<string | null>;
  departureTime: FormControl<string | null>;
  prices: FormGroup<{ [key: string]: FormControl<number | null> }>;
}

interface FormGroupInterface {
  segment: FormArray<FormGroup<SegmentForm>>;
}

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton, MatIcon],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent implements OnInit {
  @Input() schedule!: Schedule;

  @Input() path!: number[];

  form!: FormGroup<FormGroupInterface>;

  ngOnInit() {
    this.form = new FormGroup({
      segment: new FormArray(this.getFormArray())
    });
  }

  getFormArray() {
    return this.schedule.segments.map(
      (segment) =>
        new FormGroup({
          arrivalTime: new FormControl(segment.time[0], [Validators.required]),
          departureTime: new FormControl(segment.time[1], [Validators.required]),
          prices: new FormGroup(this.getPricesFormArray(segment.price))
        })
    );
  }

  getPricesFormArray(prices: { [key: string]: number }) {
    return Object.entries(prices).reduce(
      (controls, [key, value]) => {
        controls[key] = new FormControl(value, [Validators.required]);
        return controls;
      },
      {} as { [key: string]: FormControl<number | null> }
    );
  }

  get getSegmentFormControls() {
    return (this.form.get('segment') as FormArray).controls as FormGroup<SegmentForm>[];
  }

  getPriceControls(segmentFC: FormGroup): FormControl<number | null>[] {
    const prices = segmentFC.get('prices');
    return (prices instanceof FormArray ? prices.controls : []) as FormControl<number | null>[];
  }

  getPrices(pricesGroup: AbstractControl | null): { key: string; control: FormControl<number | null> }[] {
    if (pricesGroup instanceof FormGroup) {
      return Object.entries(pricesGroup.controls).map(([key, control]) => ({ key, control: control as FormControl<number | null> }));
    }
    return [];
  }

  onPriceChange() {
    console.log(this.schedule.segments);
  }

  submit() {
    console.log('submit');
  }
}
