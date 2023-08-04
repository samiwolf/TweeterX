import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {QuicklinkComponent} from "../components/quicklink/quicklink.component";
import {PostComponent} from "../components/post/post.component";
import {TweetComponent} from "../components/tweet/tweet.component";
import {UserProfileComponent} from "../components/user-profile/user-profile/user-profile.component";
import {UsersListComponent} from "../components/users-list/users-list.component";
import {MyProfileComponent} from "../components/my-profile/my-profile/my-profile.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, QuicklinkComponent, PostComponent,
    TweetComponent, UserProfileComponent, UsersListComponent, MyProfileComponent],
  exports: [QuicklinkComponent, PostComponent,
    TweetComponent, UserProfileComponent, UsersListComponent, MyProfileComponent]
})
export class HomePageModule {}
