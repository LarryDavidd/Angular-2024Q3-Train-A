import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { Subscription } from 'rxjs';
import { Route } from '../../models/search-response.model';
import { StationData } from '../../models/search-response.model';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [NgForOf, DatePipe],
  providers: [DatePipe],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.scss'
})
export class ResultListComponent implements OnInit, OnDestroy {
  cityFrom!: StationData;

  cityTo!: StationData;

  routesData!: Routes[];

  private subscription!: Subscription;

  constructor(
    // private datePipe: DatePipe,
    private dataService: SearchDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService.data$.subscribe((response) => {
      if (response && response.from) {
        this.cityFrom = response.from;
        this.cityTo = response.to;
      }

      if (response && response.routes) {
        this.routesData = this.getDataItems(response.routes, this.cityFrom.stationId, this.cityTo.stationId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDataItems(routes: Route[], stationIdFrom: number, stationIdTo: number) {
    const routesData: Routes[] = [];

    routes.forEach((route) => {
      const indexFrom = this.getIndexFromStationInRoute(route.path, stationIdFrom);
      const indexTo = this.getIndexFromStationInRoute(route.path, stationIdTo);

      route.schedule.forEach((schedule) => {
        if (schedule.segments[indexFrom] && schedule.segments[indexTo]) {
          const segmentFrom = schedule.segments[indexFrom];
          const segmentTo = schedule.segments[indexTo - 1];

          if (segmentFrom && segmentTo.time && segmentFrom.time.length > 0 && segmentTo.time.length > 0) {
            const startDate = new Date(segmentFrom.time[0]);
            const endDate = new Date(segmentTo.time[1]);

            const localStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
            const localEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
            const duration = new Date(localEndDate.getTime() - localStartDate.getTime());

            if (localStartDate && localEndDate) {
              const routeElem: Routes = {
                startDate: localStartDate,
                endDate: localEndDate,
                duration: duration
              };

              routesData.push(routeElem);
            }
          }
        }
      });
    });

    return routesData;
  }

  getIndexFromStationInRoute(stations: number[], idStation: number): number {
    return stations.indexOf(idStation);
  }

  calculateDuration(startDate: Date, endDate: Date): string {
    const diffInMs = endDate.getTime() - startDate.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60)) % 60;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${this.padWithZero(days)}:${this.padWithZero(hours)}:${this.padWithZero(minutes)}`;
    } else {
      return `${this.padWithZero(hours)}:${this.padWithZero(minutes)}`;
    }
  }

  padWithZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  getTravelTime(start: Date, end: Date): string {
    const duration = end.getTime() - start.getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;

    let travelTime = '';
    if (days > 0) {
      travelTime += `${days}d `;
    }
    travelTime += `${remainingHours}h `;
    travelTime += `${remainingMinutes}m`;

    return travelTime.trim();
  }
}

type Routes = {
  startDate: Date;
  endDate: Date;
  duration: Date;
}; // соберем тип данных для поездки
