import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LibraryService} from "../../services/library.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private librarySvc: LibraryService
  ) {}

  latestBooks=[];

  ionViewDidEnter(){
    this.librarySvc.latestBooks().then(books=>{
      console.log(books);
      this.latestBooks=books;
    });
  }

}
