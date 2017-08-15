import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";



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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private librarySvc: LibraryService,
    private loadingCtrl: LoadingController
  ) {
    this.searchText=navParams.get('searchText');
  }

  ionViewDidLoad() {
    this.search();
  }

  search(){
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中...'
    });
    this.loading.present();
    this.librarySvc.search(this.searchText).then((data)=>{
      this.setId=data.setId;
      this.totalCount=data.totalCount;
    });
  }



}
