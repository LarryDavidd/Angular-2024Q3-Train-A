import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Schedule } from 'admin/ride/model/ride.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

interface SegmentForm {
  arrivalDate: FormControl<string | null>;
  arrivalTime: FormControl<string | null>;
  departureDate: FormControl<string | null>;
  departureTime: FormControl<string | null>;
  prices: FormGroup<{ [key: string]: FormControl<number | null> }>;
}

interface FormGroupInterface {
  segment: FormArray<FormGroup<SegmentForm>>;
}

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIcon,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconButton
  ],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent implements OnInit {
  @Input() schedule!: Schedule;

  @Input() path!: number[];

  form!: FormGroup<FormGroupInterface>;

  isButtonDisable = false;

  ngOnInit() {
    this.form = new FormGroup({
      segment: new FormArray(this.getFormArray())
    });
  }

  getFormArray() {
    return this.schedule.segments.map(
      (segment) =>
        new FormGroup({
          arrivalDate: new FormControl({ value: segment.time[0], disabled: true }, [Validators.required]),
          arrivalTime: new FormControl({ value: this.getTime(segment.time[0]), disabled: true }, [Validators.required]),
          departureDate: new FormControl({ value: segment.time[1], disabled: true }, [Validators.required]),
          departureTime: new FormControl({ value: this.getTime(segment.time[1]), disabled: true }, [Validators.required]),
          prices: new FormGroup(this.getPricesFormArray(segment.price))
        })
    );
  }

  getPricesFormArray(prices: { [key: string]: number }) {
    return Object.entries(prices).reduce(
      (controls, [key, value]) => {
        controls[key] = new FormControl({ value, disabled: true }, [Validators.required]);
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

  onPriceChange(index: number) {
    this.form.controls.segment.controls[index].controls.prices.enable();
    console.log(this.form.controls.segment.controls[index].controls.prices.value);
  }

  onPriceUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.prices.disable();
  }

  onArrivalDateChange(index: number) {
    this.form.controls.segment.controls[index].controls.arrivalDate.enable();
    this.form.controls.segment.controls[index].controls.arrivalTime.enable();
  }

  onArrivalDateUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.arrivalDate.disable();
    this.form.controls.segment.controls[index].controls.arrivalTime.disable();
    console.log('update arrival date' + index);
  }

  onDepartureDateChange(index: number) {
    this.form.controls.segment.controls[index].controls.departureDate.enable();
    this.form.controls.segment.controls[index].controls.departureTime.enable();
  }

  onDepartureDateUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.departureDate.disable();
    this.form.controls.segment.controls[index].controls.departureTime.disable();
    console.log('update departure date' + index);
  }

  getTime(dateTime: string | null) {
    if (dateTime) {
      const timePart = dateTime.split('T')[1];
      const [hours, minutes] = timePart.split(':');
      return hours + ':' + minutes;
    } else {
      return '0';
    }
  }

  submit() {
    console.log('submit');
  }
}
