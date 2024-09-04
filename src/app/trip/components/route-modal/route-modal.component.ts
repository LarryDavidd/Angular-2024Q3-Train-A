import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { RouteEventItem, RouteModalData } from 'trip/models/trip.model';
import { TimelineModule } from 'primeng/timeline';
import { StationsService } from 'admin/stations/services/stations.service';
import { Station } from 'admin/stations/model/station.model';
import transformDate from 'trip/helpers/transformDate';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { calculateTimeDifference } from 'orders/helpers/calculate-time-difference';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, MatDialogContent, TimelineModule, MatProgressSpinnerModule],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss'
})
export class RouteModalComponent implements OnInit {
  public stations: Station[] = [];

  public events: RouteEventItem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RouteModalData,
    private stationsService: StationsService
  ) {}

  ngOnInit(): void {
    this.events = Array(this.data.path.length).fill({
      stationCity: '',
      departureTime: '',
      arrivalTime: ''
    });
    this.getSegmentsTime();
    this.getStationsNames(this.data.path).subscribe((res) => (this.events = res));
  }

  getStationsNames(path: number[]): Observable<RouteEventItem[]> {
    return this.stationsService.getStations().pipe(
      map((stations) => {
        return path.map((p, i) => {
          const station = stations.find((s) => s.id === p)!;
          return {
            stationCity: station.city,
            departureTime: this.events[i].departureTime,
            arrivalTime: this.events[i].arrivalTime,
            stop: this.events[i].stop,
            icon: station.id === this.data.fromStationId || station.id === this.data.toStationId ? 'pi pi-map-marker' : 'pi pi-circle',
            color: station.id === this.data.fromStationId || station.id === this.data.toStationId ? '#f87171' : '#1e40af'
          };
        });
      })
    );
  }

  getSegmentsTime() {
    this.data.path.forEach((_, i) => {
      if (i === 0) {
        this.events[i] = {
          ...this.events[i],
          departureTime: transformDate(this.data.segments[i].time[0], true),
          arrivalTime: '',
          stop: 'first station'
        };
      } else if (i === this.data.path.length - 1) {
        this.events[i] = {
          ...this.events[i],
          arrivalTime: transformDate(this.data.segments[i - 1].time[1], true),
          departureTime: '',
          stop: 'last station'
        };
      } else {
        this.events[i] = {
          ...this.events[i],
          arrivalTime: transformDate(this.data.segments[i].time[0], true),
          departureTime: transformDate(this.data.segments[i - 1].time[1], true),
          stop: calculateTimeDifference(this.data.segments[i - 1].time[1], this.data.segments[i].time[0])
        };
      }
    });
  }
}
