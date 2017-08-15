import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CONFIG} from "../../app/config";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version=CONFIG.version;

  constructor(
    private navCtrl: NavController,
    private inAppBrowser: InAppBrowser
  ) {}

  openGitHubLink(){
    this.inAppBrowser.create('https://github.com/awmleer/zjuLibrary','_system');
  }

}
