import { Component, OnInit } from '@angular/core';
import {DatashareService} from "../../../service/datashare/datashare.service";
import {TweetService} from "../../../service/tweet/tweet.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  searchedText = '';

  constructor( public dataShareService: DatashareService,
               private tweetService: TweetService) { }

  ngOnInit() {}

  onSubmit() {

    console.log(this.searchedText);
    this.tweetService.search(this.searchedText).then(
      (res: any) =>
      {
        console.log('res', res);
        this.dataShareService.showSearchResult = true;
        this.dataShareService.currentPage = 'users';
        setTimeout(()=> {
          this.dataShareService.searchResults.next(res.search_results);
        }, 0);
      }
    ).catch(
      (err) => {
        console.log('err', err);
      }
    );
  }
}
