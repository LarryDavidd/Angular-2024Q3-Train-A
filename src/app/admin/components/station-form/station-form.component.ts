import { Component, OnInit } from '@angular/core';
import { CreatedStation, Station } from 'admin/models/stations.model';
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

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe((stations) => {
      this.availableStations = stations;
    });
  }

  onCoordinateSelected(coordinates: { latitude: number; longitude: number }) {
    this.station.latitude = coordinates.latitude;
    this.station.longitude = coordinates.longitude;
  }

  onConnectionSelected(ind: number, stationId: number) {
    this.station.relations[ind] = stationId;
    if (this.station.relations.length === this.selectFields.length) {
      this.addConnectionField();
    }
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
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
