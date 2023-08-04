import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TweetService} from "../../service/tweet/tweet.service";
import {DatashareService} from "../../service/datashare/datashare.service";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent  implements OnInit , AfterViewInit, OnDestroy{

  usersCount = 0;
  @Input() userList: any[] = [];
  @Input() loadUsersList = true;
  showSearchResult = false;
  destroy$ = new Subject<any>();

  constructor(private tweetService: TweetService,
              public dataShareService: DatashareService) {
    this.showSearchResult = this.dataShareService.showSearchResult;
  }

  ngOnInit() {
  this.handleSearchResults();
  }

  handleSearchResults() {
    this.dataShareService.searchResults
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response) {
          this.userList = response;
          // console.log('handleSearchResults',response);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.userList.length === 0 && this.loadUsersList && !this.showSearchResult )
    {
      this.tweetService.getUsers().then(
        (res: any) => {
          console.log('getUsers ', res);
          this.usersCount = res.count;
          this.userList = res.users;
        }
      )
    }

  }

  viewUserProfile(user: any) {
    this.dataShareService.currentUser = user;
    this.dataShareService.currentPage = 'user';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
