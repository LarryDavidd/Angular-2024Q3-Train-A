import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatedStation, Station } from 'admin/models/stations.model';
import { MapFormSynchroService } from 'admin/services/map-form-synchro.service';
import { StationService } from 'admin/services/station.service';

@Component({
  selector: 'app-station-form',
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
    private stationService: StationService,
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
      if (this.station.relations.length < connections.length) {
        this.addConnectionField();
      }
      this.station.relations = connections;
    });
  }

  onCoordinateSelected(coordinates: { latitude: number; longitude: number }) {
    this.station.latitude = coordinates.latitude;
    this.station.longitude = coordinates.longitude;
  }

  onConnectionSelected(ind: number, stationId: number) {
    this.station.relations[ind] = stationId;
    this.synhroService.updateConnections(this.station.relations);
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
      },
      error: (err: string) => {
        this.handleError(err);
        console.error(err);
      }
    });
  }

  handleError(err: string) {
    this.snackBar.open(err, 'close', { duration: 3000 });
  }
}
