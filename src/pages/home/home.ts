import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetailPage} from "../book-detail/book-detail";
import {HotBook, LatestBook} from "../../classes/book";
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
  hotBooks:HotBook[]=[];
  searchText:string='';
  bookListType:'hot'|'latest'='hot';

  ionViewDidLoad(){
    this.freshLatestBooks();
    this.freshHotBooks();
  }

  doRefresh(refresher){
    this.freshHotBooks().then(()=>{
      this.freshLatestBooks().then(()=>{
        refresher.complete();
      });
    }).catch(()=>{
      refresher.complete();
    });
  }


  freshHotBooks():Promise<null>{
    return this.librarySvc.hotBooks().then((books)=>{
        this.hotBooks=books;
    }).catch(()=>{
      this.toastSvc.toast('获取热门图书失败');
      throw new Error();
    });
  }

  freshLatestBooks():Promise<null>{
    return this.librarySvc.latestBooks().then(books=>{
      this.latestBooks=books;
    }).catch(()=>{
        this.toastSvc.toast('获取最新图书失败');
        throw new Error();
    });
  }

  goBookDetail(bookId:string,base:string){
    this.navCtrl.push(BookDetailPage,{
      'id': bookId,
      'base': base
    });
  }

  search(){
    this.navCtrl.push(BookSearchPage,{
      'searchText': this.searchText
    });
  }

}
