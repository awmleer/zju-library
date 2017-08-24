import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail, BookItem} from "../../classes/book";
import {CollectionService} from "../../services/collection.service";
import {ToastService} from "../../services/toast.service";
import {BookItemsPage} from "../book-items/book-items";



@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  book:BookDetail;
  items:BookItem[];
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
    return (this.book && this.book.id);
  }

  get isCollected():boolean{
    if (this.bookLoaded) {
      return this.collectionSvc.isCollected(this.book.id);
    }else{
      return false;
    }
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
    })
  }

  freshenBookData():Promise<null>{
    return new Promise((resolve, reject) => {
      this.librarySvc.bookDetail(this.base,this.id).then(book=>{
        // console.log(book);
        this.book=book;
        resolve();
      }).catch(()=>{
          reject();
      });
    });

  }

  toggleCollect(){
    if (this.isCollected) {
      this.collectionSvc.unCollect(this.book.id);
    }else{
      this.collectionSvc.collect({
        bookId:this.book.id,
        title:this.book.title,
        author:this.book.author,
        callNumber:this.items.length>0?this.items[0].callNumber:'',
        press:this.book.press.name,
        year:this.book.year
      });
    }
  }

  viewBookItems(){
    this.navCtrl.push(BookItemsPage,{
      'id':this.id,
      'base':this.base
    });
  }

}
