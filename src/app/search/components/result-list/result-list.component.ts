import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { Subscription } from 'rxjs';
import { Route, Segment } from '../../models/search-response.model';
import { StationData } from '../../models/search-response.model';
import { FilterService } from '../../services/filter.service';
import { Routes } from '../../models/routes.model';
import { FilterByDatePipe } from '../../pipes/filter-by-date.pipe';
import { Station } from '../../models/get-stations-response.model';
import { HttpClient } from '@angular/common/http';
import { City } from '../../models/stations.model';
import { MatIcon } from '@angular/material/icon';
import { RouteModalComponent } from '../../../trip/components/route-modal/route-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [NgForOf, DatePipe, FilterByDatePipe, MatIcon, RouterLink],
  providers: [DatePipe],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.scss'
})
export class ResultListComponent implements OnInit, OnDestroy {
  cityFrom!: StationData;

  cityTo!: StationData;

  routesData!: Routes[];

  private subscription!: Subscription;

  selectedDate: Date | null = null;

  private subscriptions: Subscription = new Subscription();

  protected citiesList!: City[];

  constructor(
    private filterService: FilterService,
    private dataService: SearchDataService,
    protected http: HttpClient,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.data$.subscribe((response) => {
        if (response && response.from) {
          this.cityFrom = response.from;
          this.cityTo = response.to;
        }

        if (response && response.routes) {
          this.routesData = this.getDataItems(response.routes, this.cityFrom.stationId, this.cityTo.stationId);
        }
      })
    );

    this.subscriptions.add(
      this.filterService.selectedDate$.subscribe((date) => {
        this.selectedDate = date;
      })
    );

    this.http.get<Station[]>('/api/station').subscribe({
      next: (processedData) => {
        this.citiesList = processedData;
      },
      error: (error) => {
        console.error('Ошибка при получении данных:', error);
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

      const path: number[] = route.path;

      const routeId: number = route.id;

      route.schedule.forEach((schedule) => {
        if (schedule.segments[indexFrom] && schedule.segments[indexTo - 1]) {
          const rideId = schedule.rideId;
          const segmentFrom = schedule.segments[indexFrom];
          const segmentTo = schedule.segments[indexTo - 1];

          const segments: Segment[] = schedule.segments;

          if (segmentFrom && segmentTo) {
            const startDate = new Date(segmentFrom.time[0]);
            const endDate = new Date(segmentTo.time[1]);

            const localStartDate = new Date(startDate.getTime());
            const localEndDate = new Date(endDate.getTime());
            const duration = new Date(localEndDate.getTime() - localStartDate.getTime());

            if (localStartDate && localEndDate) {
              const routeElem: Routes = {
                startDate: localStartDate,
                endDate: localEndDate,
                duration: duration,
                path: path,
                routeId: routeId,
                rideId: rideId,
                segments: segments
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

  getCityById(cities: City[], id: number): string | null {
    let cityObj;
    if (cities) {
      cityObj = cities.find((city) => city.id === id);
    }

    return cityObj ? cityObj.city : null;
  }

  openRouteModal(route: Routes): void {
    this.modal.open(RouteModalComponent, {
      data: {
        rideId: route.rideId,
        routeId: route.routeId,
        path: route.path,
        segments: route.segments,
        fromStationId: this.cityFrom.stationId,
        toStationId: this.cityTo.stationId
      }
    });
  }
}
