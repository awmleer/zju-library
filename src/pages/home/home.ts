import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetailPage} from "../book-detail/book-detail";
import {LatestBook} from "../../classes/book";
import {BookSearchPage} from "../book-search/book-search";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private librarySvc: LibraryService,
    private toastSvc: ToastService
  ) {}

  latestBooks:LatestBook[]=[];
  searchText:string='';

  ionViewDidLoad(){
    this.freshLatestBooks();
  }

  doRefresh(refresher){
    this.freshLatestBooks().then(()=>{
      refresher.complete();
    }).catch(()=>{
      refresher.complete();
    });
  }

  freshLatestBooks():Promise<null>{
    return this.librarySvc.latestBooks().then(books=>{
      // console.log(books);
      this.latestBooks=books;
    }).catch(()=>{
        this.toastSvc.toast('获取最新图书失败');
        throw new Error();
    });
  }

  goBookDetail(book:LatestBook){
    this.navCtrl.push(BookDetailPage,{
      'id': book.id,
      'base': book.base
    });
  }

  search(){
    this.navCtrl.push(BookSearchPage,{
      'searchText': this.searchText
    });
  }

}
