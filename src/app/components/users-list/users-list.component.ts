import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TweetService} from "../../service/tweet/tweet.service";
import {DatashareService} from "../../service/datashare/datashare.service";


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent  implements OnInit , AfterViewInit{

  usersCount = 0;
  userList: any[] = [];

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.tweetService.getUsers().then(
      (res: any) => {
        console.log('getUsers ', res);
        this.usersCount = res.count;
        this.userList = res.users;
      }
    )
  }

  viewUserProfile(user: any) {
    this.dataShareService.currentUser = user;
    this.dataShareService.currentPage = 'user';
  }
}
