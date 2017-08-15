import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookRecord} from "../../classes/book";



@IonicPage()
@Component({
  selector: 'page-book-search',
  templateUrl: 'book-search.html',
})
export class BookSearchPage {
  searchText:string;
  loading:Loading;
  setId:string;
  totalCount:number;
  bulkLength:number=10;
  bookRecords:BookRecord[]=[];
  recordStartNumber:number=1;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private librarySvc: LibraryService,
    private loadingCtrl: LoadingController
  ) {
    this.searchText=navParams.get('searchText');
  }

  ionViewDidLoad() {
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中'
    });
    this.search();

  }

  search(){
    this.loading.present();
    this.librarySvc.search(this.searchText).then((data)=>{
      this.setId=data.setId;
      this.totalCount=data.totalCount;
      this.loadRecords();
      //TODO catch
    });
  }

  loadRecords(){
    this.librarySvc.present(this.recordStartNumber,this.bulkLength,this.setId).then(bookRecords=>{
      Array.prototype.push.apply(this.bookRecords,bookRecords);
      this.recordStartNumber+=this.bulkLength;
      console.log(bookRecords);
      this.loading.dismiss();
    });
  }



}
