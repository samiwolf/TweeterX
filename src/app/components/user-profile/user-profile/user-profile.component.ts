import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TweetService} from "../../../service/tweet/tweet.service";
import {DatashareService} from "../../../service/datashare/datashare.service";
import {Subject, takeUntil} from "rxjs";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  user: any;
  tweetCount = 0;
  showFollowing = false;
  showFollowers = false;
  tweets = [];
  followers = [];
  followings = [];
  loadingNextTweets = false;
  loadingNextFollowings = false;
  loadingNextFollowers = false;
  followersLoadingComplete = false;
  followingsLoadingComplete = false;
  destroy$ = new Subject<any>();

  constructor(private tweetService: TweetService,
              private toastController: ToastController,
              public dataShareService: DatashareService) {
    this.user = this.dataShareService.currentUser;
  }

  ngOnInit() {
    this.handleCurrentUserChange();
  }

  handleCurrentUserChange() {
    this.dataShareService.currentUserUpdated
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.id !== this.user.id) {
          this.loadData();
        }
      });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  loadData() {

    this.tweetCount = 0;
    this.showFollowing = false;
    this.showFollowers = false;
    this.tweets = [];
    this.followers = [];
    this.followings = [];
    this.user = this.dataShareService.currentUser;
    this.tweetService.getTweetsById(this.user.id).then(
      (res: any) => {
        console.log('getTweetsById ', res);
        this.tweetCount = res.count;
        this.tweets = res.tweets;
      }
    );

    this.tweetService.getFollowerssById(this.user.id).then(
      (res: any) => {
        console.log('getFollowerssById ', res);
        this.followers = res.followers;
      }
    )

    this.tweetService.getFollowingsById(this.user.id).then(
      (res: any) => {
        console.log('getFollowingsById ', res);
        this.followings = res.followings;
      }
    )
  }

  loadNextTweets(event: any) {
    if (this.loadingNextTweets === false && this.tweets.length >= 30) {
      this.loadingNextTweets = true;
      this.tweetService.getTweetsByIdPaginate(this.user.id, Math.floor(this.tweets.length / 30) + 1).then(
        (res: any) => {
          console.log('getTweetsByIdPaginate ', res);
          this.tweetCount += res.count;
          this.tweets = this.tweets.concat(res.tweets);
          this.loadingNextTweets = false;
          setTimeout(() => {
            event.target.complete();
          }, 200);
        }
      );
    }
  }


  loadNextFollowings(event: any) {
    if (this.loadingNextFollowings === false && this.followings.length >= 30) {
      this.loadingNextFollowings = true;
      this.tweetService.getFollowingsByIdPaginate( this.user.id,Math.floor(this.followings.length / 30) + 1).then(
        (res: any) => {
          console.log('getFollowingsPaginate ', res);
          if (res.count < 30)
          {
            this.followingsLoadingComplete = true;
          }
          this.followings = this.followings.concat(res.followings);
          this.loadingNextFollowings = false;
          setTimeout(() => {
            event.target.complete();
          }, 200);
        }
      );
    }
    else {
      event.target.complete();
    }
  }

  loadNextFollowers(event: any) {
    if (this.loadingNextFollowers === false && this.followers.length >= 30) {
      this.loadingNextFollowers = true;
      this.tweetService.getFollowersByIdPaginate( this.user.id,Math.floor(this.followers.length / 30) + 1).then(
        (res: any) => {
          console.log('getFollowersPaginate ', res);
          if (res.count < 30)
          {
            this.followersLoadingComplete = true;
          }
          this.followers = this.followers.concat(res.followers);
          this.loadingNextFollowers = false;
          setTimeout(() => {
            event.target.complete();
          }, 200);
        }
      );
    }
    else {
      event.target.complete();
    }
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  follow(id: string) {
    this.tweetService.follow(id).then(
      (res: any) => {
        console.log('res', res);
        this.presentToast(res.resp);
      }
    ).catch(
      (err) => {
        console.log('err', err);
      }
    );
  }
}
