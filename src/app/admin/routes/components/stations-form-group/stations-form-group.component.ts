import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  onChange(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedId = selectedOption.id;

    this.setStations = { id: selectedId, index };
    this.setIdsToParent = { id: selectedId, index };
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
  }
}
