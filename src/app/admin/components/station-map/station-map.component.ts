import { AfterViewInit, Component } from '@angular/core';
import { StationService } from 'admin/services/station.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html'
})
export class StationMapComponent implements AfterViewInit {
  private map: L.Map | undefined;

  private marker: L.Marker | undefined;

  latitude: number = 52.4862;

  longitude: number = -1.8904;

  constructor(private stationService: StationService) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map', { center: [51.505, -0.09], zoom: 6 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'assets/leaflet/';

    this.addStationsMarkers();
  }

  addStationsMarkers() {
    this.stationService.getStations().subscribe((stations) => {
      stations.forEach((station) => {
        L.marker([station.latitude, station.longitude]).addTo(this.map!);
      });
    });
  }
}
