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
  loadingNextTweets = false;
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

  loadNextTweets(event: any) {
    if (this.loadingNextTweets === false && this.tweets.length >= 30) {
      this.loadingNextTweets = true;
      this.tweetService.getMyTimelinePaginate( Math.floor(this.tweets.length / 30) + 1).then(
        (res: any) => {
          console.log('getMyTimelinePaginate ', res);
          this.tweetCount += res.count;
          this.tweets = this.tweets.concat(res.timeline);
          this.loadingNextTweets = false;
          setTimeout(() => {
            event.target.complete();
          }, 200);
        }
      );
    }
  }



}
