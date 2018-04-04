import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {ToastService} from "../../services/toast.service";
import {BookItem} from "../../classes/book";



@IonicPage()
@Component({
  selector: 'page-book-items',
  templateUrl: 'book-items.html',
})
export class BookItemsPage {
  loading:Loading;
  items:BookItem[]=null;

  constructor(
    public navCtrl: NavController,
    private librarySvc: LibraryService,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private toastSvc: ToastService,
  ) {}

  ionViewWillLoad(){
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中'
    });
    this.loading.present();
  }

  get id():string{
    return this.navParams.get('id');
  }

  get base():string{
    let base=this.navParams.get('base');
    if (!base) {
      base='ZJU01';
    }
    return base;
  }

  ionViewDidLoad(){
    this.freshenItems().catch(()=>{
      this.navCtrl.pop();
      this.toastSvc.toast('加载失败');
    }).then(()=>{
      this.loading.dismiss();
    });
  }


  freshenItems():Promise<void>{
    return this.librarySvc.bookItems(this.base,this.id).then(items=>{
      // console.log(items);
      this.items=items;
    });
  }

  get borrowedItemsCount():number{
    let count=0;
    for(let item of this.items){
      if (item.borrowed) {
        count++;
      }
    }
    return count;
  }


}
