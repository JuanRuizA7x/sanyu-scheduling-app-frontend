import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getContractorsByIdentificationNumberLike(identificationNumber: string): Observable<User[]> {

    const requestUrl: string = `${this.backendUrl}/api/administrator/contractors/identification-number-like`;
    const token = sessionStorage.getItem(this.tokenKey);
    const email = sessionStorage.getItem(this.emailKey);

    if (!token || !email) {
      this.router.navigateByUrl('/auth/logout');
      return throwError(() => new Error('Token not available'));
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestParams = new HttpParams()
    .set('identificationNumber', identificationNumber);

  return this.httpClient.get<User[]>(requestUrl, { headers, params: requestParams });

  }

}
