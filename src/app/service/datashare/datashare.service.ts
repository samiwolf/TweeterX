import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private _currentPage = 'home';
  private _currentUser: any = null;
  currentUserUpdated = new Subject<any>();
  successfullyTweeted = new Subject<any>();
  searchResults = new Subject<any>();
  showSearchResult = false;
  constructor() { }


  get currentUser(): any {
    return this._currentUser;
  }

  set currentUser(value: any) {
    this._currentUser = value;
    this.currentUserUpdated.next(value);
  }

  get currentPage(): string {
    return this._currentPage;
  }

  set currentPage(value: string) {
    this._currentPage = value;
  }
}
