import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {LeanService} from './lean.service'
import {User} from 'leancloud-storage'


@Injectable()
export class AccountService {
  user: User = null;

  constructor(
    private http: HttpClient,
    private leanSvc: LeanService,
  ) {
    this.user = this.leanSvc.AV.User.current();
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

  freshenUserInfo() {
    this.user = this.leanSvc.AV.User.current();
  }

}
