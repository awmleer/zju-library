import {Injectable} from '@angular/core';
import * as AV from 'leancloud-storage';
import {CONST} from '../app/const'
import {BookCollection} from '../classes/collection'

@Injectable()
export class LeanService {
  AV = AV;

  constructor() {
    // const { Query, User } = AV;
    this.AV.init({
      appId: CONST.leanCloud.appId,
      appKey: CONST.leanCloud.appKey,
    });
    this.AV.Object.register(BookCollection);
  }
}
