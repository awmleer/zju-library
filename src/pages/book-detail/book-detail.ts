import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail, BookItem} from "../../classes/book";



@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  id:string;
  base:string;
  book:BookDetail;
  items:BookItem[];
  loading:Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private librarySvc: LibraryService,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillLoad(){
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中...'
    });
    this.loading.present();
  }

  ionViewDidLoad(){
    this.id=this.navParams.get('id');
    this.base=this.navParams.get('base');
    this.librarySvc.bookDetail(this.base,this.id).then(book=>{
      console.log(book);
      this.book=book;
      this.librarySvc.bookItems(this.base,this.id).then(items=>{
        console.log(items);
        this.items=items;
        this.loading.dismiss();
      });
    });
  }

}
