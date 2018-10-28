import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {ToastService} from '../../services/toast.service'
import {AccountService} from '../../services/account.service'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(
    public navCtrl: NavController,
    private accountSvc: AccountService,
    private toastSvc: ToastService,
    private loadingCtrl: LoadingController,
  ) {}

  async signUp() {
    if (this.username === '') {
      await this.toastSvc.toast('请输入用户名');
      return;
    }
    if (this.password !== this.passwordRepeat) {
      await this.toastSvc.toast('两次输入的密码不一致');
      return;
    }
    const loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '登录中'
    });
    await loading.present();
    try {
      await this.accountSvc.signUp(this.username, this.password);
      await loading.dismiss();
      await this.navCtrl.pop();
      await this.toastSvc.toast('账号注册成功');
    } catch (e) {
      await loading.dismiss();
      await this.toastSvc.toast('注册失败');
    }
  }

}
