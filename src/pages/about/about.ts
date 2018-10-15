import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CONST} from "../../app/const";
import {UpdateService} from "../../services/update.service";
import {Clipboard} from "@ionic-native/clipboard";
import {ToastService} from "../../services/toast.service";

@IonicPage()
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
    private inAppBrowser: InAppBrowser,
    private clipborad: Clipboard,
    private toastSvc: ToastService,
  ) {}

  openGitHubLink(){
    this.inAppBrowser.create('https://github.com/awmleer/zju-library','_system');
  }

  copyToClipboard(text:string){
    this.clipborad.copy(text).then(() => {
      this.toastSvc.toast('已复制到剪贴板');
    });
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
