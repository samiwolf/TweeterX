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

  getMyTweetsPaginate(page: number)
  {
    return this.http
      .get(`${this.handlerUrl}/my-tweets`+ '?page=' + page).toPromise();
  }

  getMyTimeline()
  {
    return this.http
      .get(`${this.handlerUrl}/timeline`).toPromise();
  }

  getMyTimelinePaginate(page: number)
  {
    return this.http
      .get(`${this.handlerUrl}/timeline`+ '?page=' + page).toPromise();
  }

  getTweetsById(id: string)
  {
    return this.http
      .get(`${this.handlerUrl}/users/` + id + '/tweets').toPromise();

  }

  getTweetsByIdPaginate(id: string, page: number)
  {
    return this.http
      .get(`${this.handlerUrl}/users/` + id + '/tweets' + '?page=' + page).toPromise();

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

  getTweets()
  {
    return this.http
      .get(`${this.handlerUrl}/my-tweets`).toPromise();

  }

  getFollowings()
  {
    return this.http
      .get(`${this.handlerUrl}/following`).toPromise();

  }

  getFollowers()
  {
    return this.http
      .get(`${this.handlerUrl}/followers`).toPromise();

  }

  getUsers()
  {
    return this.http
      .get(`${this.handlerUrl}/users`).toPromise();

  }

  follow(id: string)
  {
    return this.http
      .post(`${this.handlerUrl}/follow`, {
        user_id: id
      }).toPromise();
  }

  unfollow(id: string)
  {
    return this.http
      .post(`${this.handlerUrl}/unfollow`, {
        user_id: id
      }).toPromise();
  }

  tweet(text: string)
  {
    return this.http
      .post(`${this.handlerUrl}/tweet`, {
        content: text
      }).toPromise();
  }

  search(text: string)
  {
    return this.http
      .post(`${this.handlerUrl}/search`, {
        token: text
      }).toPromise();
  }
}
