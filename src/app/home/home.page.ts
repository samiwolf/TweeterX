import {AfterViewInit, Component} from '@angular/core';
import {TweetService} from "../service/tweet/tweet.service";
import {DatashareService} from "../service/datashare/datashare.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  tweetCount = 0;
  tweets = [];
  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) {}

  ngAfterViewInit(): void {
    this.tweetService.getMyTimeline().then(
      (res: any) => {
        console.log('getMyTweets ', res);
        this.tweetCount = res.count;
        this.tweets = res.timeline;
      }
    )
  }



}
