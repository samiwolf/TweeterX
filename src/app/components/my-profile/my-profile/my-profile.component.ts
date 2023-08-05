import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {TweetService} from "../../../service/tweet/tweet.service";
import {DatashareService} from "../../../service/datashare/datashare.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent  implements OnInit, AfterViewInit, OnDestroy {

  // user: any;
  tweetCount = 0;
  showFollowing = false;
  showFollowers = false;
  tweets = [];
  followers = [];
  followings = [];
  loadingNextTweets = false;
  destroy$ = new Subject<any>();

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) {
    // this.user = this.dataShareService.currentUser;
  }

  ngOnInit() {
    this.handleTweetUpdate();
  }

  handleTweetUpdate() {
    this.dataShareService.successfullyTweeted
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response) {
          this.loadMyTweets();
        }
      });
  }

  loadMyTweets()
  {
    this.tweetService.getTweets().then(
      (res: any) => {
        console.log('loadMyTweets', res);
        this.tweetCount = res.count;
        this.tweets = res.my_tweets;
      }
    );
  }

  loadNextTweets(event: any) {
    if (this.loadingNextTweets === false && this.tweets.length >= 30) {
      this.loadingNextTweets = true;
      this.tweetService.getMyTweetsPaginate( Math.floor(this.tweets.length / 30) + 1).then(
        (res: any) => {
          console.log('getMyTweetsPaginate ', res);
          this.tweetCount += res.count;
          this.tweets = this.tweets.concat(res.my_tweets);
          this.loadingNextTweets = false;
          setTimeout(() => {
            event.target.complete();
          }, 200);
        }
      );
    }
  }

  loadData()
  {
    this.tweetCount = 0;
    this.showFollowing = false;
    this.showFollowers = false;
    this.tweets = [];
    this.followers = [];
    this.followings = [];

    this.loadMyTweets();

    this.tweetService.getFollowers().then(
      (res: any) => {
        this.followers = res.followers;
      }
    )

    this.tweetService.getFollowings().then(
      (res: any) => {
        this.followings = res.followings;
      }
    )
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
