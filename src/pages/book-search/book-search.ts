import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookRecord} from "../../classes/book";
import {BookDetailPage} from "../book-detail/book-detail";
import {ToastService} from "../../services/toast.service";



@IonicPage()
@Component({
  selector: 'page-book-search',
  templateUrl: 'book-search.html',
})
export class BookSearchPage {
  searchText:string;
  loading:Loading=null;
  setId:string;
  totalCount:number=-1;
  bulkLength:number=10;
  bookRecords:BookRecord[]=[];
  recordStartNumber:number;
  hasError:boolean;
  // showManualLoad: boolean=false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private librarySvc: LibraryService,
    private loadingCtrl: LoadingController,
    private toastSvc: ToastService
  ) {
    this.searchText=this.navParams.get('searchText');
  }

  ionViewDidLoad() {
    this.search();
  }

  showLoading(){
    if (this.loading==null) {
      this.loading=this.loadingCtrl.create({
        spinner: 'dots',
        content: '加载中'
      });
      this.loading.present();
    }
  }

  dismissLoading(){
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading=null;
  }

  search(){
    this.showLoading();
    this.hasError=null;
    this.totalCount=-1;
    this.bookRecords=[];
    this.recordStartNumber=1;
    this.librarySvc.search(this.searchText).then((data)=>{
      this.setId=data.setId;
      this.totalCount=data.totalCount;
      this.loadRecords();
    }).catch(()=>{
      this.dismissLoading();
      this.hasError=true;
      this.toastSvc.toast('加载失败');
    });
  }

  loadRecords():Promise<void>{
    // this.showLoading();
    return this.librarySvc.present(this.recordStartNumber,this.bulkLength,this.setId).then(bookRecords=>{
      Array.prototype.push.apply(this.bookRecords,bookRecords);
      this.recordStartNumber+=this.bulkLength;
      this.dismissLoading();
      this.hasError=false;
    }).catch(()=>{
      this.dismissLoading();
      if (this.hasError == null) {
        this.hasError=true;
      }
      this.toastSvc.toast('加载失败');
    });
  }

  get allRecordsLoaded():boolean{
    return this.recordStartNumber>this.totalCount
  }

  goBookDetail(bookRecord){
    this.navCtrl.push(BookDetailPage,{
      'id': bookRecord.id
    });
  }



}
