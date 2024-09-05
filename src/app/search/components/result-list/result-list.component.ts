import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { Subscription } from 'rxjs';
import { Route } from '../../models/search-response.model';
import { StationData } from '../../models/search-response.model';
import { FilterService } from '../../services/filter.service';
import { Routes } from '../../models/routes.model';
import { FilterByDatePipe } from '../../pipes/filter-by-date.pipe';
import { Station } from '../../models/get-stations-response.model';
import { HttpClient } from '@angular/common/http';
import { City } from '../../models/stations.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [NgForOf, DatePipe, FilterByDatePipe, MatIcon],
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
    protected http: HttpClient
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

      const firstRoutestation: number = route.path[0];
      const lastRoutestation: number = route.path[route.path.length - 1];

      route.schedule.forEach((schedule) => {
        if (schedule.segments[indexFrom] && schedule.segments[indexTo - 1]) {
          const segmentFrom = schedule.segments[indexFrom];
          const segmentTo = schedule.segments[indexTo - 1];

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
                firstRouteStation: firstRoutestation,
                lastRouteStation: lastRoutestation
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
    const cityObj = cities.find((city) => city.id === id);

    return cityObj ? cityObj.city : null;
  }
}
