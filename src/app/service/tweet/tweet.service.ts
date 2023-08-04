import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private handlerUrl = `${environment.handlerApiUrl}`;

  constructor(private authService: AuthService,
              private http: HttpClient,
              public router: Router) {
  }

  getMyTweets() {
    return this.http
      .get(`${this.handlerUrl}/my-tweets`).toPromise();
  }
}
