import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {ToastService} from "../../services/toast.service";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string;
  password:string;

  constructor(
    public navCtrl: NavController,
    private accountSvc: AccountService,
    private toastSvc: ToastService,
    private loadingCtrl: LoadingController
  ) {}

  async logIn(){
    const loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '登录中'
    });
    await loading.present();
    try {
      await this.accountSvc.logIn(this.username,this.password);
      await this.navCtrl.pop();
      await this.toastSvc.toast('登录成功');
    } catch(e) {
      await loading.dismiss();
      await this.toastSvc.toast('登录失败');
    }
  }

}
