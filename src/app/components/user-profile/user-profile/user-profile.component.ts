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
export class UserProfileComponent  implements OnInit, AfterViewInit, OnDestroy {
  user: any;
  tweetCount = 0;
  showFollowing = false;
  showFollowers = false;
  tweets = [];
  followers = [];
  followings = [];
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

  loadData()
  {

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

  ngAfterViewInit(): void {
  this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  follow(id: string) {
    this.tweetService.follow(id).then(
      (res: any) =>
      {
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
