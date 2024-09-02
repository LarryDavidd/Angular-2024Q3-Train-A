import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpService } from '../../services/http.service';
import { SearchResponse } from '../../models/search-response.model';
import { Station } from '../../models/get-stations-response.model';
import { SearchDataService } from '../../services/search-data.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = this.fb.group({
    cityFrom: new FormControl<CityItem | string>('', [Validators.required, this.cityItemValidator()]),
    cityTo: new FormControl<CityItem | string>('', [Validators.required, this.cityItemValidator()]),
    startDate: new FormControl<Date | null>(null, Validators.required)
  });

  cityItemValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: { value: string | CityItem } } | null => {
      const value = control.value;

      const isValid = value && typeof value === 'object' && 'city' in value && 'latitude' in value && 'longitude' in value;

      return isValid ? null : { invalidCity: { value } };
    };
  }

  dateControl: FormControl<Date | null> = this.searchForm.get('startDate') as FormControl;

  cities: CityItem[] = [];

  filteredOptionsFrom!: Observable<CityItem[]>;

  filteredOptionsTo!: Observable<CityItem[]>;

  minDate = new Date();

  selectedDate: Date | null = null;

  selectedTime: Date | null = null;

  selectedTimeString: string = '';

  //временно тут
  searchResult!: SearchResponse;
  //временно тут

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private httpService: HttpService,
    private dataService: SearchDataService
  ) {}

  ngOnInit(): void {
    this.http
      .get<Station[]>('/api/station')
      .pipe(
        map((response) =>
          response.map((city) => ({
            city: city.city,
            latitude: city.latitude,
            longitude: city.longitude
          }))
        )
      )
      .subscribe({
        next: (processedData) => {
          this.cities = processedData;
        },
        error: (error) => {
          console.error('Ошибка при получении данных:', error);
        }
      });

    this.filteredOptionsTo = this.searchForm.get('cityTo')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const city = typeof value === 'string' ? value : value?.city;
        return city ? this._filter(city as string) : this.cities.slice();
      })
    );

    this.filteredOptionsFrom = this.searchForm.get('cityFrom')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const city = typeof value === 'string' ? value : value?.city;
        return city ? this._filter(city as string) : this.cities.slice();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _filter(text: string): CityItem[] {
    const filterValue = text.toLowerCase();

    return this.cities.filter((city) => city.city.toLowerCase().includes(filterValue));
  }

  displayFn(city: CityItem): string {
    return city && city.city ? city.city : '';
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      console.log('Форма отправлена:', this.searchForm.value);
      this.httpService.searchRoutes(this.searchForm.value).subscribe({
        next: (response) => {
          this.searchResult = response;
          this.dataService.updateData(response);
          console.log('Ответ с сервера$:', this.dataService.data$);
        },
        error: (error) => {
          console.error('Произошла ошибка:', error);
        }
      });
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.dateControl.setValue(this.selectedDate);
  }

  onTimeChange(time: string) {
    this.selectedTimeString = time;
    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    this.selectedTime = date;
    this.setTimeForDate();
  }

  setTimeForDate() {
    if (this.selectedTime) {
      this.selectedDate!.setHours(this.selectedTime.getHours(), this.selectedTime.getMinutes(), 0, 0);
    }
    this.dateControl.setValue(this.selectedDate);
  }

  openTimePicker(timePicker: NgxMaterialTimepickerComponent) {
    timePicker.open();
  }
}

export interface CityItem {
  city: string;
  latitude: number;
  longitude: number;
}
