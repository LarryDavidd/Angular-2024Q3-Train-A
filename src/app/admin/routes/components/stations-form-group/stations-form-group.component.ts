import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { GetStationsResponse } from 'admin/stations/model/station.model';

@Component({
  selector: 'app-stations-form-group',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatOption, MatInputModule, MatButton, MatSelect],
  templateUrl: './stations-form-group.component.html',
  styleUrl: './stations-form-group.component.scss'
})
export class StationsFormGroupComponent implements OnInit, OnDestroy {
  @Input() stations!: GetStationsResponse;

  @Input() selectedStationsIds!: string[];

  @Output() setSelectedStationsIds = new EventEmitter<string[]>();

  stationsForSelect: GetStationsResponse[] = [];

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

  getStationById(id: number) {
    return this.stations.find((station) => station.id === id);
  }

  onChange(event: MatSelectChange, index: number): void {
    this.setStations = { id: event.value, index };
    this.setIdsToParent = { id: event.value, index };
  }

  set setStations({ id, index }: { id: string; index: number }) {
    this.form.controls.select.controls = this.form.controls.select.controls.splice(0, index + 1);

    this.addSelectField();

    this.stationsForSelect = this.stationsForSelect.slice(0, index + 1);

    this.stationsForSelect[index + 1] = [];

    const station = this.getStationById(Number(id));

    this.stations.forEach((defaultStation) => {
      station?.connectedTo.forEach((connectedStation) => {
        if (defaultStation.id === connectedStation.id) this.stationsForSelect[index + 1].push(defaultStation);
      });
    });
  }

  set setIdsToParent({ id, index }: { id: string; index: number }) {
    this.selectedStationsIds = this.selectedStationsIds.slice(0, index);

    this.selectedStationsIds.push(id);

    this.setSelectedStationsIds.emit(this.selectedStationsIds);
  }

  ngOnInit() {
    this.stationsForSelect.push(this.stations);
    if (this.selectedStationsIds) {
      this.selectedStationsIds.forEach((id, index) => {
        this.setStations = { id, index };
        this.setIdsToParent = { id, index };
      });
    }
  }

  ngOnDestroy(): void {
    this.reset();
  }
}
