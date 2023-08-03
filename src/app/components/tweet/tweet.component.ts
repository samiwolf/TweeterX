import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent  implements OnInit {

  @Input() tweet: any;

  constructor() { }

  ngOnInit() {
    console.log('one tweet: ', this.tweet);
    this.parseTweet();
  }

  parseTweet() {
    this.tweet.text = this.tweet.text.replace(/#[a-zA-Z]+/g,`<span class="highlight">$&</span>`);
    this.tweet.text = this.tweet.text.replace(/@[a-zA-Z]+/g,`<span class="highlight">$&</span>`);
  }

}
