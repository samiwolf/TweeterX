import {AfterViewInit, Component} from '@angular/core';
import {TweetService} from "../service/tweet/tweet.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  tweetCount = 0;
  tweets = [];
  // tweets = [{
  //   img: 'assets/icon/person-circle.svg',
  //   username: 'samiul',
  //   handle: 'samiul',
  //   date: Date.now().toLocaleString(),
  //   liked: false,
  //   like: '3',
  //   response: 'hsdasd',
  //   text : 'This Bennett build specializes in pure and effective healing to keep your party alive. Be sure to have his Base ATK really high to have a better ATK buff.'
  // }, {
  //   img: 'assets/icon/person-circle.svg',
  //   username: 'samiul',
  //   handle: 'samiul',
  //   date: Date.now().toLocaleString(),
  //   liked: false,
  //   like: '3',
  //   response: 'hsdasd',
  //   text : 'This Bennett build specializes in pure and effective healing to keep your party alive. Be sure to have his Base ATK really high to have a better ATK buff.'
  // }, {
  //   img: 'assets/icon/person-circle.svg',
  //   username: 'samiul',
  //   handle: 'samiul',
  //   date: Date.now().toLocaleString(),
  //   liked: false,
  //   like: '3',
  //   response: 'hsdasd',
  //   text : 'This Bennett build specializes in pure and effective healing to keep your party alive. Be sure to have his Base ATK really high to have a better ATK buff.'
  // }]
  constructor(private tweetService: TweetService) {}

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
