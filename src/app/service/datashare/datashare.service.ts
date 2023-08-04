import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private _currentPage = 'home';
  private _currentUser: any = null;
  constructor() { }


  get currentUser(): any {
    return this._currentUser;
  }

  set currentUser(value: any) {
    this._currentUser = value;
  }

  get currentPage(): string {
    return this._currentPage;
  }

  set currentPage(value: string) {
    this._currentPage = value;
  }
}
