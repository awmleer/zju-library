import { Component } from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CONST} from "../../app/const";
import {UpdateService} from "../../services/update.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version=CONST.version;

  constructor(
    private navCtrl: NavController,
    public updateSvc: UpdateService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser
  ) {}

  openGitHubLink(){
    this.inAppBrowser.create('https://github.com/awmleer/zjuLibrary','_system');
  }

  update(){
    if (this.platform.is('android')) {
      this.inAppBrowser.create(this.updateSvc.androidDownloadLink,'_system');
    }else{
      this.alertCtrl.create({
        title: '更新',
        subTitle: '请在App Store中进行更新',
        buttons: ['好的']
      }).present();
    }
  }

}
