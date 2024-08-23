import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class StationsFormGroupComponent implements OnInit {
  @Input() stations!: GetStationsResponse;

  private lastSelectedStationID: number | null = null;

  stationsForSelect: GetStationsResponse[] = [];

  form = new FormGroup({
    select: new FormArray([new FormControl('', [Validators.required])])
  });

  onChange(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedId = selectedOption.id;
    this.setStations = { id: selectedId, index };
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
    return this.stations.find((station) => station.id === this.lastSelectedStationID);
  }

  set setStations({ id, index }: { id: string; index: number }) {
    // this.form.controls.select.controls = this.form.controls.select.controls.splice(index);
    this.addSelectField();

    console.log(this.stationsForSelect, id, index);
    // this.stationsForSelect = this.stationsForSelect.splice(index + 1);
    console.log(this.stationsForSelect, id, index);

    this.stationsForSelect[index + 1] = [];

    const item = this.getStationById(Number(id));

    this.stations.forEach((defaultStation) => {
      item?.connectedTo.forEach((connectedStation) => {
        if (defaultStation.id === connectedStation.id) this.stationsForSelect[index + 1].push(defaultStation);
      });
    });
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

  ngOnInit() {
    this.stationsForSelect.push(this.stations);
  }
}
