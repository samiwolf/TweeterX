import { Component, OnInit } from '@angular/core';
import {TweetService} from "../../../service/tweet/tweet.service";
import {DatashareService} from "../../../service/datashare/datashare.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {
  user: any;

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) {
    this.user = this.dataShareService.currentUser;
    console.log(this.user);
  }

  ngOnInit() {}

}
