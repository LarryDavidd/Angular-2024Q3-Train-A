import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatedStation, Station } from '../../model/station.model';
import { MapFormSynchroService } from 'admin/stations/services/map-form-synchro.service';
import { StationsService } from '../../services/stations.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './station-form.component.html'
})
export class StationFormComponent implements OnInit {
  station: CreatedStation = {
    city: '',
    latitude: 0,
    longitude: 0,
    relations: []
  };

  availableStations: Station[] = [];

  selectFields = [...this.station.relations, undefined];

  constructor(
    private stationService: StationsService,
    private synhroService: MapFormSynchroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe((stations) => {
      this.availableStations = stations;
    });

    this.synhroService.coordinates$.subscribe((coords) => {
      this.station.latitude = coords.latitude;
      this.station.longitude = coords.longitude;
    });

    this.synhroService.connections$.subscribe((connections) => {
      if (this.station.relations.length < connections.size) {
        this.addConnectionField();
      }
      this.station.relations = Array.from(connections);
      if (this.station.relations.length === 0) {
        this.selectFields = [undefined];
      }
    });
  }

  onCoordinateSelected(coordinates: { latitude: number; longitude: number }) {
    this.station.latitude = coordinates.latitude;
    this.station.longitude = coordinates.longitude;
  }

  onConnectionSelected(ind: number, stationId: number) {
    this.station.relations[ind] = stationId;
    this.synhroService.updateConnections(new Set(this.station.relations));
    if (this.station.relations.length === this.selectFields.length) {
      this.addConnectionField();
    }
  }

  onLatitudeChange(latitude: number) {
    this.station.latitude = latitude;
    this.synhroService.updateCoordinates(latitude, this.station.longitude);
  }

  onLongitudeChange(longitude: number) {
    this.station.longitude = longitude;
    this.synhroService.updateCoordinates(this.station.latitude, longitude);
  }

  addConnectionField() {
    this.selectFields.push(undefined);
  }

  isStationSelected(id: number): boolean {
    return this.station.relations.includes(id);
  }

  onSubmit() {
    this.stationService.addStation(this.station).subscribe({
      next: (res) => {
        this.snackBar.open(`Station with id ${res.id} created successfully`, 'close', { duration: 3000 });
        this.clearForm();
      },
      error: (err: string) => {
        this.handleError(err);
        console.error(err);
      }
    });
  }

  clearForm() {
    this.station = {
      city: '',
      latitude: 0,
      longitude: 0,
      relations: []
    };
    this.selectFields = [...this.station.relations, undefined];
  }

  handleError(err: string) {
    this.snackBar.open(err, 'close', { duration: 3000 });
  }
}
