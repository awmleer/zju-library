import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";


@Injectable()
export class AccountService {
  private token:string;
  constructor(
    private http: Http
  ) {}

  getToken():Promise<null>{
    return this.http.get(CONST.libraryUrl+'/F?RN='+Math.round(Math.random()*1000000000)).toPromise().then((response:Response)=>{
      let t=response.text().match(/="http:\/\/webpac\.zju\.edu\.cn:80\/F\/([A-Z]|-|\d)+/g);
      this.token = t[0].replace('="http://webpac.zju.edu.cn:80/F/','');
    });
  }

  login():Promise<null>{
    return new Promise((resolve, reject) => {
      this.getToken().then(()=>{
        console.log(this.token);
        this.http.post(CONST.libraryUrl+`/F/${this.token}`,{
          'func':'login-session',
          'login_source':'bor-info',
          'bor_id':'',
          'bor_verification':'',
          'bor_library':'ZJU50'
        }).toPromise().then((response:Response)=>{
          console.log(response.text());
          resolve();
        });
      });
    });
  }

}
