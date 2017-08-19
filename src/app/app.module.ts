import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LibraryService} from "../services/library.service";
import {HttpModule} from "@angular/http";
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
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BookDetailPageModule,
    BookSearchPageModule,
    AboutPageModule,
    LoginPageModule,
    ComponentsModule
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
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
