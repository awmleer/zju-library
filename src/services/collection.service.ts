import {Injectable} from '@angular/core';
import {BookCollection} from '../classes/collection';
import {AccountService} from './account.service'
import {BookDetail} from '../classes/book'
import {LeanService} from './lean.service'

@Injectable()
export class CollectionService {
  collections:BookCollection[] = null;

  constructor(
    private accountSvc: AccountService,
    private leanSvc: LeanService,
  ) {
    this.freshenCollections();
    this.accountSvc.userChanged$.subscribe(() => {
      this.collections = null;
      this.freshenCollections();
    });
  }

  getQuery() {
    return new this.leanSvc.AV.Query(BookCollection);
  }

  async freshenCollections(): Promise<void> {
    if (!this.accountSvc.user) return;
    const query = this.getQuery();
    query.equalTo('userId', this.accountSvc.user.id);
    this.collections = await query.find();
  }

  async getCollection(bookId: string): Promise<BookCollection> {
    const query = this.getQuery();
    query.equalTo('userId', this.accountSvc.user.id);
    query.equalTo('bookId', bookId);
    const ret = await query.find();
    if (ret.length > 1) {
      for (let i = 1; i < ret.length; i++) {
        await ret[i].destroy();
      }
      return ret[0];
    } else if (ret.length === 1) {
      return ret[0];
    } else {
      return null;
    }
  }

  async collect(bookDetail: BookDetail): Promise<BookCollection> {
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
    return collection;
  }

  async unCollect(collection: BookCollection): Promise<void> {
    await collection.destroy();
  }

  async deleteAllCollections(): Promise<void> {
    await this.leanSvc.AV.Object.destroyAll(this.collections);
    await this.freshenCollections();
  }

}
