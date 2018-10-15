import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {CollectionService} from "../../services/collection.service";
import {BookCollection} from "../../classes/collection";
import {BookDetailPage} from "../book-detail/book-detail";
import {AccountService} from '../../services/account.service'

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private collectionSvc: CollectionService,
    public accountSvc: AccountService,
  ) {}

  get collections(): BookCollection[] {
    return this.collectionSvc.collections;
  }

  goBookDetail(bookCollection:BookCollection){
    this.navCtrl.push(BookDetailPage,{
      'id':bookCollection.attributes.bookId
    });
  }

  deleteAllCollections(){
    this.alertCtrl.create({
      title: '删除',
      message: '确定要删除所有的收藏记录吗？',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '是的，删除',
          handler: () => {
            this.collectionSvc.deleteAllCollections();
          }
        }
      ]
    }).present();
  }

  async ionViewWillEnter() {
    this.collectionSvc.freshenCollections();
  }

}
