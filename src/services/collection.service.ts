import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BookCollection} from '../classes/collection';
import * as AV from 'leancloud-storage';
import {AccountService} from './account.service'
import {BookDetail} from '../classes/book'

@Injectable()
export class CollectionService {
  collections:BookCollection[] = null;

  constructor(
    private storage: Storage,
    private accountSvc: AccountService,
  ) {
    this.freshenCollections();
    this.accountSvc.userChanged$.subscribe(() => {
      this.collections = null;
      this.freshenCollections();
    });
  }

  async freshenCollections(): Promise<void> {
    if (!this.accountSvc.user) return;
    const query = new AV.Query(BookCollection);
    query.equalTo('userId', this.accountSvc.user.id);
    this.collections = await query.find();
  }

  saveCollections():Promise<void>{
    return this.storage.set('collections',this.collections);
  }

  isCollected(bookId:string):boolean{
    if (!bookId) {
      return false;
    }
    for(let collection of this.collections){
      if (bookId == collection.attributes.bookId) {
        return true;
      }
    }
    return false;
  }

  async collect(bookDetail: BookDetail): Promise<void> {
    if (!this.accountSvc.user) return;
    const collection = new BookCollection();
    collection.set('userId', this.accountSvc.user.id);
    collection.set('bookId', bookDetail.id);
    collection.set('title', bookDetail.title);
    collection.set('author', bookDetail.author);
    collection.set('classNumber', bookDetail.classNumber);
    collection.set('press', bookDetail.press.name);
    collection.set('year', bookDetail.year);
    await collection.save();
  }

  async unCollect(bookId:string): Promise<void> {

  }

  async deleteAllCollections(): Promise<void> {

  }

}
