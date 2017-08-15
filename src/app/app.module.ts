import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CollectionPage,
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
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CollectionPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LibraryService,
    CollectionService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
