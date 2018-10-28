import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastService} from '../../services/toast.service'
import {AccountService} from '../../services/account.service'


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  // oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastSvc: ToastService,
    private accountSvc: AccountService,
  ) {}

  async submit() {
    if (this.newPassword !== this.newPasswordConfirm) {
      await this.toastSvc.toast('两次输入的密码不一致');
      return;
    }
    await this.accountSvc.changePassword(this.newPassword);
    await this.toastSvc.toast('修改成功');
    await this.navCtrl.pop();
  }

}
