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
  destroy$ = new Subject<any>();

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) {
    // this.user = this.dataShareService.currentUser;
  }

  ngOnInit() {
    // this.handleCurrentUserChange();
  }

  loadData()
  {
    this.tweetCount = 0;
    this.showFollowing = false;
    this.showFollowers = false;
    this.tweets = [];
    this.followers = [];
    this.followings = [];
    // this.user = this.dataShareService.currentUser;
    this.tweetService.getTweets().then(
      (res: any) => {
        console.log('getTweetsById ', res);
        this.tweetCount = res.count;
        this.tweets = res.tweets;
      }
    );

    this.tweetService.getFollowers().then(
      (res: any) => {
        console.log('getFollowerssById ', res);
        this.tweetCount = res.count;
        this.followers = res.followers;
      }
    )

    this.tweetService.getFollowings().then(
      (res: any) => {
        console.log('getFollowingsById ', res);
        this.followings = res.followings;
      }
    )
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
    // this.destroy$.complete();
  }

}
