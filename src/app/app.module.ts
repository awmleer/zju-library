import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Platform} from 'ionic-angular';
import { MyApp } from './app.component';

import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LibraryService} from "../services/library.service";
import {BookDetailPageModule} from "../pages/book-detail/book-detail.module";
import {ComponentsModule} from "../components/components.module";
import {BookSearchPageModule} from "../pages/book-search/book-search.module";
import {IonicStorageModule} from "@ionic/storage";
import {CollectionService} from "../services/collection.service";
import {ToastService} from "../services/toast.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {UpdateService} from "../services/update.service";
import {AccountService} from "../services/account.service";
import {AboutPageModule} from "../pages/about/about.module";
import {MePage} from "../pages/me/me";
import {LoginPageModule} from "../pages/login/login.module";
import {SocialSharing} from "@ionic-native/social-sharing";
import {BookItemsPageModule} from "../pages/book-items/book-items.module";
import {Clipboard} from "@ionic-native/clipboard";
import {AppRate} from "@ionic-native/app-rate";
import {HttpBackend, HttpClientModule, HttpXhrBackend} from '@angular/common/http';
import {NativeHttpBackend, NativeHttpFallback, NativeHttpModule} from 'ionic-native-http-connection-backend'
import {LeanService} from '../services/lean.service'
import {SignupPageModule} from '../pages/signup/signup.module'
import {ChangePasswordPageModule} from '../pages/change-password/change-password.module'

@NgModule({
  declarations: [
    MyApp,
    CollectionPage,
    MePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NativeHttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BookDetailPageModule,
    BookSearchPageModule,
    AboutPageModule,
    LoginPageModule,
    SignupPageModule,
    BookItemsPageModule,
    ChangePasswordPageModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MePage,
    CollectionPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LibraryService,
    CollectionService,
    UpdateService,
    AccountService,
    ToastService,
    LeanService,
    InAppBrowser,
    SocialSharing,
    Clipboard,
    AppRate,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
  ]
})
export class AppModule {}
