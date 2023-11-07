import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../../models/user.interface';
import { WorkShiftRequest } from '../../../models/work-shift-request.interface';
import { WorkShiftResponse } from '../../../models/work-shift-response.interface';
import { WorkShift } from '../../../models/work-shift.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkShiftService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getWorkShiftsByDateRange(startDate: string, endDate: string): Observable<WorkShift[]> {

    const requestUrl: string = `${this.backendUrl}/api/contractor/work-shifts/email-and-date-range`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
      .set('email', email)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient.get<WorkShift[]>(requestUrl, { headers, params: requestParams });

  }

  markWorkShiftAsStarted(workShiftId: number): Observable<void> {

    const requestUrl: string = `${this.backendUrl}/api/contractor/notify-work-shift`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
      .set('workShiftId', workShiftId);

      console.log(requestUrl);

    return this.httpClient.put<void>(requestUrl, null, { headers, params: requestParams });

  }

}
