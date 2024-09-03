import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Schedule, Segment } from 'admin/ride/model/ride.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateValidator } from 'admin/ride/validators/date.validator';
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
  selector: 'app-ride-card',
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
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent implements OnInit {
  @Input() schedule!: Schedule;

  @Input() path!: number[];

  @Output() updateCurrentRide = new EventEmitter<{ rideId: number; segment: Segment; index: number }>();

  form!: FormGroup<FormGroupInterface>;

  dateService = inject(DateTimeService);

  ngOnInit() {
    this.form = new FormGroup({
      segment: new FormArray(this.getFormArray())
    });
  }

  getFormArray() {
    return this.schedule.segments.map(
      (segment) =>
        new FormGroup({
          arrivalDate: new FormControl({ value: segment.time[0], disabled: true }, [Validators.required, DateValidator]),
          arrivalTime: new FormControl({ value: this.getTime(segment.time[0]), disabled: true }, [Validators.required]),
          departureDate: new FormControl({ value: segment.time[1], disabled: true }, [Validators.required, DateValidator]),
          departureTime: new FormControl({ value: this.getTime(segment.time[1]), disabled: true }, [Validators.required]),
          prices: new FormGroup(this.getPricesFormArray(segment.price))
        })
    );
  }

  getPricesFormArray(prices: { [key: string]: number }) {
    const res = Object.entries(prices).reduce(
      (controls, [key, value]) => {
        controls[key] = new FormControl({ value, disabled: true }, [Validators.required]);
        return controls;
      },
      {} as { [key: string]: FormControl<number | null> }
    );
    return res;
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
  }

  onPriceUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.prices.disable();
    this.submit(index);
  }

  onArrivalDateChange(index: number) {
    this.form.controls.segment.controls[index].controls.arrivalDate.enable();
    this.form.controls.segment.controls[index].controls.arrivalTime.enable();
  }

  onArrivalDateUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.arrivalDate.disable();
    this.form.controls.segment.controls[index].controls.arrivalTime.disable();
    this.submit(index);
  }

  onDepartureDateChange(index: number) {
    this.form.controls.segment.controls[index].controls.departureDate.enable();
    this.form.controls.segment.controls[index].controls.departureTime.enable();
  }

  onDepartureDateUpdate(index: number) {
    this.form.controls.segment.controls[index].controls.departureDate.disable();
    this.form.controls.segment.controls[index].controls.departureTime.disable();
    this.submit(index);
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

  submit(i: number) {
    const rideId = this.schedule.rideId;

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

    const segment: Segment = { time: [arrivalDate, departureDate], price: transformedPrice };

    this.updateCurrentRide.emit({ rideId, segment, index: i });
  }
}
