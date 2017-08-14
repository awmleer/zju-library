import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetailPage} from "../book-detail/book-detail";
import {LatestBook} from "../../classes/book";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private librarySvc: LibraryService
  ) {}

  latestBooks:LatestBook[]=[];

  ionViewDidEnter(){
    this.librarySvc.latestBooks().then(books=>{
      console.log(books);
      this.latestBooks=books;
    });
  }

  goBookDetail(book:LatestBook){
    this.navCtrl.push(BookDetailPage,{
      id: book.id,
      base: book.base
    })
  }

}
