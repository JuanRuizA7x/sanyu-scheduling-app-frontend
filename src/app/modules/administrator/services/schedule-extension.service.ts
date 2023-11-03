import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, throwError } from 'rxjs';
import { ScheduleExtensionRequest } from 'src/app/models/schedule-extension-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExtensionService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

  extendSchedule(scheduleExtensionRequest: ScheduleExtensionRequest): Observable<void> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/extend-schedule`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<void>(requestUrl, scheduleExtensionRequest, { headers });

  }

}
