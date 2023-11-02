import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.dev';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtendScheduleService {

  private backendUrl: string = environment.backendUrl;
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';

  constructor(private httpClient: HttpClient, private router: Router) { }

}
