import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {QuicklinkComponent} from "../components/quicklink/quicklink.component";
import {PostComponent} from "../components/post/post.component";
import {TweetComponent} from "../components/tweet/tweet.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, QuicklinkComponent, PostComponent, TweetComponent],
  exports: [QuicklinkComponent, PostComponent, TweetComponent]
})
export class HomePageModule {}
