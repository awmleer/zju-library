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

  login(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '登录中'
    });
    this.accountSvc.login(this.username,this.password).then(()=>{
      this.navCtrl.pop().then(()=>{
        this.toastSvc.toast('登录成功');
      });
    }).catch(()=>{
      loading.dismiss().then(()=>{
        this.toastSvc.toast('登录失败');
      });
    });
  }

}
