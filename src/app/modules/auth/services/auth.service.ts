import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment.dev';
import { AuthRequest } from '../../../models/auth-request.interface';
import { AuthResponse } from '../../../models/auth-response.interface';
import { User } from '../../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl: String = environment.backendUrl;
  private user: User | undefined = undefined;
  role = new BehaviorSubject<string | undefined>(undefined);
  private tokenKey: string = 'authToken';
  private emailKey: string = 'userEmail';
  private roleKey: string = 'userRole';

  constructor(private httpClient: HttpClient) {
    if(this.isAuthenticated()) {
      this.getUserInfo().subscribe();
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const requestUrl: string = `${this.backendUrl}/api/auth/login`;
    const requestBody: AuthRequest = {
      email: email,
      password: password
    };

    return this.httpClient.post<AuthResponse>(requestUrl, requestBody).pipe(
      switchMap((response) => {
        if (response && response.email && response.token) {
          sessionStorage.setItem(this.tokenKey, response.token);
          sessionStorage.setItem(this.emailKey, response.email);
          return this.getUserInfo();
        } else {
          return of(false);
        }
      }),
      catchError(error => of(false))
    );
  }

  logout(): void {
    sessionStorage.clear();
    this.user = undefined;
    this.role.next(undefined);
  }

  isAuthenticated(): boolean {

    const email = !!sessionStorage.getItem(this.emailKey);
    const token = !!sessionStorage.getItem(this.tokenKey);

    if (email && token) {
      return true;
    } else {
      this.logout();
      return false;
    }

  }

  getLoggedInUser(): User | undefined {
    return this.user;
  }

  getUserRole(): string | undefined {
    return this.user ? this.user.role.name : undefined;
  }

  private getUserInfo(): Observable<boolean> {

    const email = sessionStorage.getItem(this.emailKey);
    const token = sessionStorage.getItem(this.tokenKey);

    if (!token || !email) {
      return of(false);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestUrl: string = `${this.backendUrl}/api/users/email/${email}`;

    return this.httpClient.get<User>(requestUrl, {headers}).pipe(
      map((response) => {
        if (response) {
          this.user = response;
          this.role.next(this.user.role.name);
          sessionStorage.setItem(this.roleKey, this.user.role.name);
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => of(false))
    );
  }

}
