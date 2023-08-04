import { Component, OnInit } from '@angular/core';
import {TweetService} from "../../service/tweet/tweet.service";
import {DatashareService} from "../../service/datashare/datashare.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  tweet = '';

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) { }

  ngOnInit() {}

  postTweet() {
    const t = this.tweet;
    this.tweet = '';
    this.tweetService.tweet(t).then(
      (res: any) =>
      {
        if (res && res.message === 'successfully created tweet' && res.tweet)
        {
          this.dataShareService.successfullyTweeted.next(res.tweet);
        }
      }
    )
  }
}
