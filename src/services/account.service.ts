import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";


@Injectable()
export class AccountService {

  constructor(
    private http: Http
  ) {}

  getToken():Promise<string>{
    return this.http.get(CONST.libraryUrl+'/F?RN='+Math.round(Math.random()*1000000000)).toPromise().then((response:Response)=>{
      let t=response.text().match(/="http:\/\/webpac\.zju\.edu\.cn:80\/F\/([A-Z]|-|\d)+/g);
      return t[0].replace('="http://webpac.zju.edu.cn:80/F/','');
    });
  }

  login(){
    this.getToken().then(token=>{
      console.log(token);
    })
  }

}
