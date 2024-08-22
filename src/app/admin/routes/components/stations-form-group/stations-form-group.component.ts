import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GetStationsResponse } from 'admin/stations/model/station.model';

@Component({
  selector: 'app-stations-form-group',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './stations-form-group.component.html',
  styleUrl: './stations-form-group.component.scss'
})
export class StationsFormGroupComponent {
  @Input() stations!: GetStationsResponse;

  private lastSelectedStationID: string | null = null;

  form = new FormGroup({
    select: new FormArray([new FormControl('', [Validators.required])])
  });

  onChange(index: number) {
    if (this.form.value.select) {
      this.lastSelectedStationID = this.form.value.select[index];
      console.log(this.lastSelectedStationID);
      this.addSelectField();
    }
  }

  addSelectField() {
    this.form.controls.select.push(new FormControl('', [Validators.required]));
  }

  reset() {
    this.form.reset();
    this.form.controls.select.clear();
    this.addSelectField();
  }

  getStationById(id: number) {
    return this.stations.find((station) => station.id === id);
  }

  get getStationByLastSelectedStationID() {
    return this.stations.find((station) => station.id === Number(this.lastSelectedStationID));
  }

  get getStations() {
    if (this.form.controls.select.length === 1) {
      return this.stations;
    } else if (this.lastSelectedStationID) {
      const item = this.getStationByLastSelectedStationID;

      const newStationsList: GetStationsResponse = [];

      this.stations.forEach((defaultStation) => {
        item?.connectedTo.forEach((connectedStation) => {
          if (defaultStation.id === connectedStation.id) newStationsList.push(defaultStation);
        });
      });

      return newStationsList;
    }
    return [];
  }
}
