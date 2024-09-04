import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { map, Subscription } from 'rxjs';
import { Route } from '../../models/search-response.model';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  dataItems: Date[] = [];

  notFoundVisibility: boolean = false;

  private subscriptions: Subscription = new Subscription();

  startIndex = 0;

  visibleCount = 4;

  selectedIndex = 0;

  constructor(
    private datePipe: DatePipe,
    private dataService: SearchDataService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.data$
        .pipe(
          map((response) => {
            if (response && response.routes) {
              this.notFoundVisibility = true;
              return this.extractUniqueDays(response.routes, response.from.stationId);
            } else {
              return [];
            }
          })
        )
        .subscribe((days) => {
          this.dataItems = days;
          this.onTabChange(0);
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private extractUniqueDays(routes: Route[], stationId: number): Date[] {
    const uniqueDays = new Set<number>();

    routes.forEach((route) => {
      const index = this.getIndexFromStationInRoute(route.path, stationId);

      route.schedule.forEach((schedule) => {
        if (schedule.segments[index]) {
          const segment = schedule.segments[index];
          if (segment && segment.time && segment.time.length > 0) {
            const startDate = new Date(segment.time[0]);

            const localDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

            uniqueDays.add(localDate.getTime());
          }
        }
      });
    });

    return Array.from(uniqueDays)
      .map((timestamp) => new Date(timestamp))
      .sort((a, b) => a.getTime() - b.getTime());
  }

  getIndexFromStationInRoute(stations: number[], idStation: number): number {
    return stations.indexOf(idStation);
  }

  get visibleDates(): Date[] {
    return this.dataItems.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  get canNavigateLeft(): boolean {
    return this.startIndex > 0;
  }

  get canNavigateRight(): boolean {
    return this.startIndex + this.visibleCount < this.dataItems.length;
  }

  previousDates(): void {
    if (this.canNavigateLeft) {
      this.startIndex--;
    }
  }

  nextDates(): void {
    if (this.canNavigateRight) {
      this.startIndex++;
    }
  }

  onTabChange(index: number): void {
    this.selectedIndex = index;

    const selectedDate = this.dataItems[index];
    this.filterService.setSelectedDate(selectedDate);
  }
}
