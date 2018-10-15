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
  collections: BookCollection[] = null;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private collectionSvc: CollectionService,
    public accountSvc: AccountService,
  ) {}

  goBookDetail(bookCollection:BookCollection){
    this.navCtrl.push(BookDetailPage,{
      'id':bookCollection.bookId
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
    this.collections = await this.collectionSvc.getCollections();
  }

}
