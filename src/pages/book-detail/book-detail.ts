import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail} from "../../classes/book";



@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  id:string;
  base:string;
  book:BookDetail;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private librarySvc: LibraryService
  ) {}

  ionViewDidLoad(){
    this.id=this.navParams.get('id');
    this.base=this.navParams.get('base');
    this.librarySvc.bookDetail(this.base,this.id).then(book=>{
      console.log(book);
      this.book=book;
    });
    this.librarySvc.bookItems(this.base,this.id).then(bookItems=>{
      console.log(bookItems);
    })
  }

}
