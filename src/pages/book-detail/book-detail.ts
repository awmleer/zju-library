import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";



@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  id:string;
  base:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private librarySvc: LibraryService
  ) {}

  ionViewWillLoad(){
    this.id=this.navParams.get('id');
    this.base=this.navParams.get('base');
    this.librarySvc.bookDetail(this.base,this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailPage');
  }

}
