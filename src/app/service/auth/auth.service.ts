import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {

  }

  public get isLoggedIn(): boolean {
    return !!this.cookieService.get('access_token');
  }

  public logout() {
    this.cookieService.deleteAll(environment.cookieOptions.path);
    return of(false);
  }

  public get authToken(): string {
    return this.cookieService.get('access_token');
  }

  setAuthToken(token: string) {
    this.cookieService.set(
      'access_token', token,
      environment.cookieOptions
    );
  }

  getAuthHeaders(url: string) {
    if ((url.includes(`${environment.handlerApiUrl}`))) {
      return {
        'X-Jwt-Token': 'Bearer ' + this.authToken
      };
    }
    else {
      return {};
    }
  }
}
