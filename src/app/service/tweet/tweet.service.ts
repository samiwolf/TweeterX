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

  getMyTimeline()
  {
    return this.http
      .get(`${this.handlerUrl}/timeline`).toPromise();

  }

  getTweetsById(id: string)
  {
    return this.http
      .get(`${this.handlerUrl}/users/` + id + '/tweets').toPromise();

  }

  getFollowingsById(id: string)
  {
    return this.http
      .get(`${this.handlerUrl}/users/` + id + '/following').toPromise();

  }

  getFollowerssById(id: string)
  {
    return this.http
      .get(`${this.handlerUrl}/users/` + id + '/followers').toPromise();

  }

  getUsers()
  {
    return this.http
      .get(`${this.handlerUrl}/users`).toPromise();

  }
}
