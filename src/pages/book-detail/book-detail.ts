import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail, BookDouban} from "../../classes/book";
import {CollectionService} from "../../services/collection.service";
import {ToastService} from "../../services/toast.service";
import {BookItemsPage} from "../book-items/book-items";
import {BookCollection} from '../../classes/collection'


@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  detail:BookDetail;
  douban:BookDouban;
  // items:BookItem[];
  loading:Loading;
  collection: BookCollection = null;
  disableCollect: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private librarySvc: LibraryService,
    private collectionSvc: CollectionService,
    private loadingCtrl: LoadingController,
    private toastSvc: ToastService
  ) {}


  get id():string{
    return this.navParams.get('id');
  }

  get base():string{
    let base=this.navParams.get('base');
    if (!base) {
      base='ZJU01';
    }
    return base;
  }

  get bookLoaded(){
    return (this.detail && this.detail.id);
  }

  get rateRounded():number{
    return Math.round(this.douban.rating.average);
  }

  ionViewWillLoad(){
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中'
    });
    this.loading.present();
  }

  ionViewDidLoad(){
    this.freshenBookData().then(()=>{
      this.loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      this.loading.dismiss();
      this.toastSvc.toast('加载失败');
    });
  }

  doRefresh(refresher){
    this.freshenBookData().then(()=>{
      refresher.complete();
    }).catch(()=>{
      refresher.complete();
      this.toastSvc.toast('加载失败');
    });
  }

  freshenBookData():Promise<void>{
    return new Promise((resolve, reject) => {
      this.librarySvc.bookDetail(this.base,this.id).then(detail=>{
        this.librarySvc.bookDouban(detail.ISBN).then(douban=>{
          this.detail=detail;
          this.douban=douban;
          resolve();
        }).catch(() => {
          this.detail=detail;
          resolve();
        });
      }).catch(() => {
        reject();
      });
    });
  }

  async toggleCollect(){
    this.disableCollect = true;
    if (this.collection) {
      await this.collectionSvc.unCollect(this.collection);
      this.collection = null;
    }else{
      this.collection = await this.collectionSvc.collect(this.detail);
    }
    this.disableCollect = false;
  }

  viewBookItems(){
    this.navCtrl.push(BookItemsPage,{
      'id':this.id,
      'base':this.base
    });
  }

  async ionViewWillEnter() {
    this.collection = await this.collectionSvc.getCollection(this.id);
    this.disableCollect = false;
  }

}
