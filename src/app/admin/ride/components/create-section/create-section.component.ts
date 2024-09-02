import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { ResponceBodySave, Schedule, Segment } from 'admin/ride/model/ride.model';
import { DateValidator } from 'admin/ride/validators/date.validator';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Carriage } from 'admin/models/carriages.model';
import { DateTimeService } from 'admin/ride/services/date-time.service';

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
  selector: 'app-create-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.scss'
})
export class CreateSectionComponent implements OnInit {
  private readonly store = inject(Store);

  @Output() openCloseCreateSection = new EventEmitter();

  @Output() saveRide = new EventEmitter<ResponceBodySave>();

  @Input() schedule!: Schedule[];

  @Input() path!: number[];

  @Input() carriages!: Carriage[];

  form!: FormGroup<FormGroupInterface>;

  dateService = inject(DateTimeService);

  getFormArray() {
    return this.path.map(
      () =>
        new FormGroup({
          arrivalDate: new FormControl('', [Validators.required, DateValidator]),
          arrivalTime: new FormControl('', [Validators.required]),
          departureDate: new FormControl('', [Validators.required, DateValidator]),
          departureTime: new FormControl('', [Validators.required]),
          prices: new FormGroup(this.getPricesFormArray())
        })
    );
  }

  getPricesFormArray() {
    return this.carriages?.reduce(
      (controls, carriage) => {
        controls[carriage.name] = new FormControl(0, [Validators.required]);
        return controls;
      },
      {} as { [key: string]: FormControl<number | null> }
    );
  }

  get getSegmentFormControls() {
    return (this.form.get('segment') as FormArray).controls as FormGroup<SegmentForm>[];
  }

  getArrivalTimeError(i: number) {
    const field = this.form.controls.segment.controls[i].controls.arrivalDate;
    return this.getTimeError(field);
  }

  getDepartureTimeError(i: number) {
    const field = this.form.controls.segment.controls[i].controls.arrivalDate;
    return this.getTimeError(field);
  }

  getTimeError(field: FormControl<string | null>) {
    switch (true) {
      case field.hasError('required'):
        return 'field is required';
      default:
        return null;
    }
  }

  getArrivalDateError(i: number) {
    const field = this.form.controls.segment.controls[i].controls.arrivalDate;
    return this.getDateError(field);
  }

  getDepartureDateError(i: number) {
    const field = this.form.controls.segment.controls[i].controls.departureDate;
    return this.getDateError(field);
  }

  getDateError(field: FormControl<string | null>) {
    switch (true) {
      case field.hasError('required'):
        return 'field is required';
      case field.hasError('date'):
        return 'The date is is invalid';
      default:
        return null;
    }
  }

  getPrices(pricesGroup: AbstractControl | null): { key: string; control: FormControl<number | null> }[] {
    if (pricesGroup instanceof FormGroup) {
      return Object.entries(pricesGroup.controls).map(([key, control]) => ({ key, control: control as FormControl<number | null> }));
    }
    return [];
  }

  submit() {
    const segment: Segment[] = [];

    this.path.forEach((val, i) => {
      const arrivalDate = this.dateService.updateDateTimeWithTimeString(
        this.form.controls.segment.controls[i].controls.arrivalDate.value!,
        this.form.controls.segment.controls[i].controls.arrivalTime.value!
      );
      const departureDate = this.dateService.updateDateTimeWithTimeString(
        this.form.controls.segment.controls[i].controls.departureDate.value!,
        this.form.controls.segment.controls[i].controls.departureTime.value!
      );

      const price = this.form.controls.segment.controls[i].controls.prices.value;

      const transformedPrice: { [key: string]: number } = Object.fromEntries(
        Object.entries(price)
          .filter(([, value]) => value !== null)
          .map(([key, value]) => [key, value as number])
      );

      segment.push({ time: [arrivalDate, departureDate], price: transformedPrice });
    });

    this.saveRide.emit({ segment });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      segment: new FormArray(this.getFormArray())
    });
  }
}
