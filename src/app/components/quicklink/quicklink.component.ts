import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatashareService} from "../../service/datashare/datashare.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-quicklink',
  templateUrl: './quicklink.component.html',
  styleUrls: ['./quicklink.component.scss'],
})
export class QuicklinkComponent  implements OnInit {

  constructor(public router: Router,
              public dataShareService: DatashareService,
              private authService: AuthService,) { }

  ngOnInit( ) {}

  goto(path: string) {
    this.dataShareService.showSearchResult = false;
    this.dataShareService.currentPage = path;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
