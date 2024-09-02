import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  dataItems: string[] = [
    '2024-08-08T22:19:57.708Z',
    '2024-08-09T22:19:57.708Z',
    '2024-08-10T22:19:57.708Z',
    '2024-08-11T22:19:57.708Z',
    '2024-08-12T22:19:57.708Z',
    '2024-08-13T22:19:57.708Z',
    '2024-08-14T22:19:57.708Z'
  ];

  startIndex = 0;

  visibleCount = 4;

  selectedIndex = 0;

  constructor(private datePipe: DatePipe) {}

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
