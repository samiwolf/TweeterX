import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatashareService} from "../../service/datashare/datashare.service";

@Component({
  selector: 'app-quicklink',
  templateUrl: './quicklink.component.html',
  styleUrls: ['./quicklink.component.scss'],
})
export class QuicklinkComponent  implements OnInit {

  constructor(public router: Router,
              public dataShareService: DatashareService) { }

  ngOnInit( ) {}

  goto(path: string) {
    this.dataShareService.currentPage = path;
  }
}
