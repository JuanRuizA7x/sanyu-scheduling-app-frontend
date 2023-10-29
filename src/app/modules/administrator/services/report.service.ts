import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

  generateReport(date: Date): Observable<void> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/generate-report`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);
    const formattedDate = this.convertDateToLocalDateTime(date);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
      .set('email', email)
      .set('date', formattedDate);

    return this.httpClient.get<void>(requestUrl, { headers, params: requestParams });

  }

  private convertDateToLocalDateTime(date: Date) {

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00`;

  }

}
