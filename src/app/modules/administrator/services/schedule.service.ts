import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, catchError, throwError } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getSchedules(): Observable<Schedule[]> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/schedules`;
    const token = sessionStorage.getItem(this.tokenKey);

    if (!token) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Schedule[]>(requestUrl, {headers}).pipe(
      catchError(error => throwError(() => new Error(error)))
    );

  }

}
