import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

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
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient) {
    console.log(this.backendUrl);
  }

  login(email: string, password: string): Observable<boolean> {
    const requestUrl: string = `${this.backendUrl}/api/auth/login`;
    const requestBody: AuthRequest = {
      email: email,
      password: password
    };

    return this.httpClient.post<AuthResponse>(requestUrl, requestBody).pipe(
      switchMap((response) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log(response)
          return this.getUserInfo(email);
        } else {
          return of(false);
        }
      }),
      catchError(error => {
        console.error('Error al obtener la información del usuario:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user = undefined;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getLoggedInUser(): User | undefined {
    return this.user;
  }

  getUserRole(): string | undefined {
    return this.user ? this.user.role.name : undefined;
  }

  private getUserInfo(email: string): Observable<boolean> {

    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      return of(false); // Devuelve un observable con false si no hay token
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Agrega el token Bearer al encabezado
    });

    const requestUrl: string = `${this.backendUrl}/api/users/email/${email}`;

    return this.httpClient.get<User>(requestUrl, {headers}).pipe(
      map((response) => {
        if (response) {
          this.user = response;
          console.log(this.user);
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => of(false))
    );
  }

}
