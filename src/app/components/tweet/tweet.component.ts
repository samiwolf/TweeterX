import {Component, Input, OnInit} from '@angular/core';
import {DatashareService} from "../../service/datashare/datashare.service";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent  implements OnInit {

  @Input() tweet: any;

  constructor( public dataShareService: DatashareService) { }

  ngOnInit() {
    // console.log('one tweet: ', this.tweet);
    this.parseTweet();
  }

  viewUserProfile(user: any) {
    this.dataShareService.currentUser = user;
    this.dataShareService.currentPage = 'user';
  }

  parseTweet() {
    this.tweet.content = this.tweet.content.replace(/#[a-zA-Z]+/g,`<span class="highlight">$&</span>`);
    this.tweet.content = this.tweet.content.replace(/@[a-zA-Z]+/g,`<span class="highlight">$&</span>`);
  }

}
