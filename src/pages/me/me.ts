import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(
    public navCtrl: NavController,
    private accountSvc: AccountService
  ) {}

  ionViewDidLoad() {
    this.accountSvc.login();
    console.log('ionViewDidLoad MePage');
  }

}
