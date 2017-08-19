import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {ToastService} from "../../services/toast.service";
import {HistoryBorrow} from "../../classes/borrow";



@IonicPage()
@Component({
  selector: 'page-borrow-history',
  templateUrl: 'borrow-history.html',
})
export class BorrowHistoryPage {
  borrows:HistoryBorrow[]=[];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private accountSvc: AccountService,
    private toastSvc: ToastService
  ) {}

  ionViewDidLoad() {
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '登录中'
    });
    loading.present();
    this.accountSvc.getHistoryBorrows().then((borrows)=>{
      this.borrows=borrows;
      loading.dismiss();
    }).catch(()=>{
        this.navCtrl.pop();
        this.toastSvc.toast('获取借阅历史失败');
    });
  }

}
