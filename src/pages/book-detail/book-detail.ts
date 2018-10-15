import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail, BookDouban, BookItem} from "../../classes/book";
import {CollectionService} from "../../services/collection.service";
import {ToastService} from "../../services/toast.service";
import {BookItemsPage} from "../book-items/book-items";



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

  get isCollected():boolean{
    if (this.bookLoaded) {
      return this.collectionSvc.isCollected(this.detail.id);
    }else{
      return false;
    }
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

  toggleCollect(){
    if (this.isCollected) {
      this.collectionSvc.unCollect(this.detail.id);
    }else{
      this.collectionSvc.collect(this.detail);
    }
  }

  viewBookItems(){
    this.navCtrl.push(BookItemsPage,{
      'id':this.id,
      'base':this.base
    });
  }

}
