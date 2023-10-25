import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  apiUrl: string = 'https://date.nager.at/api/v3';
  timeZone: string = 'GMT-05';

  constructor(private httpClient: HttpClient) { }

  getHolidaysByYearRangeAndCountryCode(startYear: number, endYear: number, countryCode: string): Observable<Date[]> {

    const observables: Observable<any>[] = [];

    for (let year = startYear; year <= endYear; year++) {
      const requestUrl: string = `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`;
      observables.push(this.httpClient.get(requestUrl));
    }

    return forkJoin(observables).pipe(map((responses: any[]) => {

      const holidayDates: Date[] = [];

      responses.forEach(response => {
        response.forEach((holiday: any) => {
          const date = new Date(holiday.date + this.timeZone);
          holidayDates.push(date);
        });
      });

      return holidayDates;

    }));

  }

}
