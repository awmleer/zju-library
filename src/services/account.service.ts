import {Injectable} from '@angular/core';
import {Http, Headers, Response,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";


@Injectable()
export class AccountService {
  private alephSessionId:string=null;
  private username:string;
  private password:string;
  private storage: SecureStorageObject;
  user;

  constructor(
    private http: Http,
    private secureStorage: SecureStorage
  ) {}

  ngOnInit(){
    this.secureStorage.create('account').then((storage:SecureStorageObject)=>{
      this.storage=storage;
      this.storage.get('username').then(data=>{
        this.username=data;
      });
      this.storage.get('password').then(data=>{
        this.password=data;
      });
    });
  }

  // getToken():Promise<string>{
  //   return this.http.get(CONST.libraryUrl+'/F?func=bor-info').toPromise().then((response:Response)=>{
  //     let t=response.text().match(/action="http:\/\/webpac\.zju\.edu\.cn:80\/F\/([A-Z]|-|\d)+/g);
  //     return t[0].replace('action="http://webpac.zju.edu.cn:80/F/','');
  //   });
  // }

  login(username:string,password:string):Promise<null>{
    return new Promise((resolve, reject) => {
      // this.getToken().then((token)=>{
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let  body = new URLSearchParams();
      body.append('func', 'login-session');
      body.append('login_source', 'bor-info');
      body.append('bor_id', username);
      body.append('bor_verification', password);
      body.append('bor_library', 'ZJU50');
      // this.http.post(CONST.libraryUrl+`/F/${this.token}`, body.toString(), {
      this.http.post(CONST.libraryUrl+`/F`, body.toString(), {
        headers:headers
      }).toPromise().then((response:Response)=>{
        if (response.text().search('校园卡统一身份认证登录')==-1) {
          this.alephSessionId=response.text().match(/ALEPH_SESSION_ID ?= ?([A-Z]|\d)+/)[0].replace(/ALEPH_SESSION_ID ?= ?/,'');
          console.log('alephSessionId',this.alephSessionId);
          this.freshUserInfo().then(()=>{
            resolve();
          });
        }else{
          this.user=null;
          reject();
        }
      });
      // });
    });
  }

  freshUserInfo():Promise<null>{
    return this.http.get(CONST.libraryUrl+'/X',{
      params:{
        'op':'bor-info',
        'bor_id':this.username,
        'verification':this.password
      }
    }).toPromise().then((response:Response)=>{
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      let error=xml.getElementsByTagName('error');

    });
  }

}
