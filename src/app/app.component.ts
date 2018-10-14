import { Component } from '@angular/core';
import {Config, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {AccountService} from "../services/account.service";
import {ToastService} from "../services/toast.service";
import {AppRate} from "@ionic-native/app-rate";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    accountSvc: AccountService,
    toastSvc: ToastService,
    config: Config,
    appRate: AppRate,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      config.set('ios','backButtonText','');
      if (platform.is('ios')) {
        appRate.preferences = {
          useLanguage:'zh-Hans',
          usesUntilPrompt: 5,
          displayAppName:'浙图',
          promptAgainForEachNewVersion:false,
          storeAppURL: {
            ios: '1271782243',
          }
        };
        appRate.promptForRating(false);
      }
    });
  }
}
