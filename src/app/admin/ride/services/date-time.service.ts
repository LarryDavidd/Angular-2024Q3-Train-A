import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  updateDateTimeWithTimeString(dateTimeStr: string, timeStr: string) {
    const date = new Date(dateTimeStr);

    const [newHours, newMinutes] = timeStr.split(':').map(Number);

    date.setUTCHours(newHours);
    date.setUTCMinutes(newMinutes);

    return date.toISOString();
  }
}
