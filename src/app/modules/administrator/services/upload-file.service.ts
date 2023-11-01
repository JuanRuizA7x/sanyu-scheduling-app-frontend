import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, throwError } from 'rxjs';
import { CsvFileResponse } from 'src/app/models/csv-file-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

  generateReport(csvFile: File): Observable<CsvFileResponse> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/upload-csv-file`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    }

    const formData = new FormData();
    formData.append('csvFile', csvFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<CsvFileResponse>(requestUrl, formData, { headers });

  }

}
