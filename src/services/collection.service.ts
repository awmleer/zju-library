import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {BookCollection} from "../classes/collection";

@Injectable()
export class CollectionService {
  collections:BookCollection[]=[];

  constructor(
    private storage: Storage
  ) {
    this.freshenCollections();
  }

  freshenCollections(){
    this.storage.get('collections').then(data=>{
      if (Object.prototype.toString.call(data) === '[object Array]') {
        this.collections=data;
      }else{
        this.collections=[];
      }
    });
  }

  saveCollections():Promise<void>{
    return this.storage.set('collections',this.collections);
  }

  isCollected(bookId:string):boolean{
    if (!bookId) {
      return false;
    }
    for(let collection of this.collections){
      if (bookId == collection.bookId) {
        return true;
      }
    }
    return false;
  }

  collect(newCollection:BookCollection):Promise<void>{
    this.collections.push(newCollection);
    return this.saveCollections();
  }

  unCollect(bookId:string):Promise<void>{
    for (let i = 0; i < this.collections.length; i++) {
      if (bookId == this.collections[i].bookId) {
        this.collections.splice(i,1);
        i--;
      }
    }
    return this.saveCollections();
  }

  deleteAllCollections():Promise<void>{
    this.collections=[];
    return this.saveCollections();
  }

}
