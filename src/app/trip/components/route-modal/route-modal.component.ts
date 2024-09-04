import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { RouteEventItem, RouteModalData } from 'trip/models/trip.model';
import { TripService } from 'trip/services/trip.service';
import { TimelineModule } from 'primeng/timeline';
import { StationsService } from 'admin/stations/services/stations.service';
import { Station } from 'admin/stations/model/station.model';
import transformDate from 'trip/helpers/transformDate';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, MatDialogContent, TimelineModule],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss'
})
export class RouteModalComponent implements OnInit {
  public stations: Station[] = [];

  public events: RouteEventItem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RouteModalData,
    private rideService: TripService, // TODO: get from ride service
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
            icon: 'pi pi-map-marker',
            color: '#ff0000'
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
          arrivalTime: ''
        };
      } else if (i === this.data.path.length - 1) {
        this.events[i] = {
          ...this.events[i],
          arrivalTime: transformDate(this.data.segments[i - 1].time[1], true),
          departureTime: ''
        };
      } else {
        this.events[i] = {
          ...this.events[i],
          arrivalTime: transformDate(this.data.segments[i].time[0], true),
          departureTime: transformDate(this.data.segments[i - 1].time[1], true)
        };
      }
    });
  }
}
