import { AfterViewInit, Component } from '@angular/core';
import { MapFormSynchroService } from 'admin/services/map-form-synchro.service';
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
const iconNewMarker = L.icon({
  iconUrl: 'assets/images/train.png',
  shadowUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [50, 30],
  shadowAnchor: [20, 30]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html'
})
export class StationMapComponent implements AfterViewInit {
  private map: L.Map | undefined;

  private marker: L.Marker | undefined;

  private isFirstLoad = true;

  constructor(
    private stationService: StationService,
    private synhroService: MapFormSynchroService
  ) {}

  ngAfterViewInit(): void {
    this.initializeMap();
    this.subscribeToFormChanges();
  }

  private initializeMap(): void {
    this.map = L.map('map', { center: [51.505, -0.09], zoom: 6 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'assets/leaflet/';

    this.addStationsMarkers();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.addNewMarker(e.latlng);
      this.synhroService.updateCoordinates(e.latlng.lat, e.latlng.lng);
    });
  }

  private subscribeToFormChanges(): void {
    this.synhroService.coordinates$.subscribe((coords) => {
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
      } else if (!this.marker) {
        this.addNewMarker(L.latLng(coords.latitude, coords.longitude));
      } else {
        this.changeExistingMarker(L.latLng(coords.latitude, coords.longitude));
      }
    });
  }

  addStationsMarkers() {
    this.stationService.getStations().subscribe((stations) => {
      stations.forEach((station) => {
        L.marker([station.latitude, station.longitude]).addTo(this.map!);
      });
    });
  }

  addNewMarker(latlng: L.LatLng) {
    if (!this.marker) {
      this.marker = L.marker(latlng, { draggable: true, autoPan: true, icon: iconNewMarker }).addTo(this.map!);
      this.map?.setView(latlng, this.map.getZoom());
    }
  }

  changeExistingMarker(latlng: L.LatLng) {
    if (this.marker) {
      this.marker.setLatLng(latlng);
      this.map?.setView(latlng, this.map.getZoom());
    }
  }
}
