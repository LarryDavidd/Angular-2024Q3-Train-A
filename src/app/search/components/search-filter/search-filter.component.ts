import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { map, Subscription } from 'rxjs';
import { Route } from '../../models/search-response.model';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  dataItems: string[] = [];

  private subscription!: Subscription;

  startIndex = 0;

  visibleCount = 4;

  selectedIndex = 0;

  constructor(
    private datePipe: DatePipe,
    private dataService: SearchDataService
  ) {}

  ngOnInit(): void {
    // Предположим, routes$ инициализирован снаружи или через сервис
    this.subscription = this.dataService.data$
      .pipe(
        map((response) => {
          // Проверка на наличие response и response.routes
          if (response && response.routes) {
            return this.extractUniqueDays(response.routes, response.from.stationId);
          } else {
            return []; // Возвращаем пустой массив, если данные отсутствуют
          }
        })
      )
      .subscribe((days) => {
        this.dataItems = days;
        // Можно также вызывать метод для обновления слайдера здесь
      });
  }

  ngOnDestroy(): void {
    // Отменяем подписку при уничтожении компонента, чтобы избежать утечек памяти
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private extractUniqueDays(routes: Route[], stationId: number): string[] {
    const uniqueDays = new Set<string>();

    routes.forEach((route) => {
      const index = this.getIndexFromStationInRoute(route.path, stationId);

      route.schedule.forEach((schedule) => {
        if (schedule.segments[index]) {
          const segment = schedule.segments[index];
          if (segment && segment.time && segment.time.length > 0) {
            const startDate = new Date(segment.time[0]);

            const localDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');

            if (localDate) {
              uniqueDays.add(localDate);
            }
          }
        }
      });
    });

    return Array.from(uniqueDays).sort();
  }

  getIndexFromStationInRoute(stations: number[], idStation: number): number {
    return stations.indexOf(idStation);
  }

  get visibleDates(): string[] {
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
    console.log('Фильтр применен, выбранная дата:', this.dataItems[this.selectedIndex]);
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MMMM dd') || '';
  }

  formatDay(date: string): string {
    return this.datePipe.transform(date, 'EEEE') || '';
  }
}
