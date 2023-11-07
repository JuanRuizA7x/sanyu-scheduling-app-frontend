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

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAvailableContractorsByRoleDateRange(roleName: string, startDate: Date, endDate: Date): Observable<User[]> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/available-contractors`;
    const token = sessionStorage.getItem(this.tokenKey);
    const formattedStartDate = this.convertDateToLocalDateTime(startDate);
    const formattedEndDate = this.convertDateToLocalDateTime(endDate);

    if (!token) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
      .set('roleName', roleName)
      .set('startDate', formattedStartDate)
      .set('endDate', formattedEndDate);

    return this.httpClient.get<User[]>(requestUrl, { headers, params: requestParams }).pipe(
      catchError(error => throwError(() => new Error(error)))
    );

  }

  assignWorkShifts(startDate: Date, endDate: Date, scheduleId: number, userId: number): Observable<WorkShiftResponse> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/assign-multiple-work-shifts`;
    const token = sessionStorage.getItem(this.tokenKey);
    const formattedStartDate = this.convertDateToLocalDateTime(startDate);
    const formattedEndDate = this.convertDateToLocalDateTime(endDate);

    if (!token) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestBody: WorkShiftRequest = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      scheduleId: scheduleId,
      userId: userId
    };

    return this.httpClient.post<WorkShiftResponse>(requestUrl, requestBody, { headers }).pipe(
      catchError(error => throwError(() => new Error(error)))
    );

  }

  getWorkShiftsByUserIdAndDateRange(userId: number, startDate: string, endDate: string): Observable<WorkShift[]> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/work-shifts/user-id-and-date-range`;
    const token = sessionStorage.getItem(this.tokenKey);

    if (!token) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
      .set('userId', userId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient.get<WorkShift[]>(requestUrl, { headers, params: requestParams });

  }

  private convertDateToLocalDateTime(date: Date) {

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00`;

  }

}
