import {EventEmitter, Injectable} from '@angular/core';
import {LeanService} from './lean.service'
import {User} from 'leancloud-storage'

@Injectable()
export class AccountService {
  _user: User;
  userChanged$ = new EventEmitter<void>(null);
  get user() {
    return this._user;
  }
  set user(u: User) {
    this._user = u;
    this.userChanged$.next();
  }

  constructor(
    private leanSvc: LeanService,
  ) {
    this.freshenUser();
  }

  async logIn(username:string, password:string):Promise<void>{
    this.user = await this.leanSvc.AV.User.logIn(username, password);
  }

  async signUp(username:string, password:string) {
    this.user = await this.leanSvc.AV.User.signUp(username, password);
  }

  async logout(){
    await this.leanSvc.AV.User.logOut();
    this.user = null;
  }

  async freshenUser() {
    this.user = await this.leanSvc.AV.User.currentAsync();
  }

  async changePassword(newPassword: string) {
    const username = this.user.getUsername();
    this.user.setPassword(newPassword);
    await this.user.save();
    await this.logIn(username, newPassword);
  }

}
