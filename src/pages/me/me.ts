import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {AboutPage} from "../about/about";
import {LoginPage} from "../login/login";
import {ToastService} from "../../services/toast.service";


@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(
    public navCtrl: NavController,
    private toastSvc: ToastService,
    private accountSvc: AccountService
  ) {}

  get user(){
    return this.accountSvc.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

  logout(){
    this.accountSvc.logout();
    this.toastSvc.toast('已成功退出登录');
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goAboutPage(){
    this.navCtrl.push(AboutPage);
  }

}
