import {Injectable} from '@angular/core';
import * as AV from 'leancloud-storage';
import {CONST} from '../app/const'

@Injectable()
export class LeanService {
  AV = AV;

  constructor() {
    // const { Query, User } = AV;
    this.AV.init({
      appId: CONST.leanCloud.appId,
      appKey: CONST.leanCloud.appKey,
    });
  }
}
