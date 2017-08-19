import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {AboutPage} from "../about/about";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(
    public navCtrl: NavController,
    private accountSvc: AccountService
  ) {}

  get user(){
    return this.accountSvc.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goAboutPage(){
    this.navCtrl.push(AboutPage);
  }

}
