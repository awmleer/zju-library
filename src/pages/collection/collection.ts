import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CollectionService} from "../../services/collection.service";
import {BookCollection} from "../../classes/collection";
import {BookDetailPage} from "../book-detail/book-detail";

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  constructor(
    private navCtrl: NavController,
    private collectionSvc: CollectionService
  ) {}

  get bookCollections():BookCollection[]{
    return this.collectionSvc.collections;
  }

  goBookDetail(bookCollection:BookCollection){
    this.navCtrl.push(BookDetailPage,{
      'id':bookCollection.bookId
    });
  }

}
