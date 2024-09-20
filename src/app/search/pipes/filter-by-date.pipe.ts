import { Pipe, PipeTransform } from '@angular/core';
import { Routes } from '../models/routes.model';

@Pipe({
  name: 'filterByDate',
  standalone: true
})
export class FilterByDatePipe implements PipeTransform {
  transform(routes: Routes[], selectedDate: Date | null): Routes[] {
    if (!routes || !selectedDate) {
      return routes;
    }

    return routes.filter((route) => {
      return (
        route.startDate.getFullYear() === selectedDate.getFullYear() &&
        route.startDate.getMonth() === selectedDate.getMonth() &&
        route.startDate.getDate() === selectedDate.getDate()
      );
    });
  }
}
