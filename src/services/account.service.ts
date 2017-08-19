import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";
import {User} from "../classes/user";
import {Storage} from "@ionic/storage";
import {HistoryBorrow} from "../classes/borrow";
import {CookieService} from "ngx-cookie";


@Injectable()
export class AccountService {
  private username:string;
  private password:string;
  user:User;
  private alephSessionId:string;

  constructor(
    private http: Http,
    private cookieSvc: CookieService,
    private storage: Storage
  ) {}

  fetchAccount():Promise<null>{
    return new Promise((resolve, reject) => {
      this.storage.get('account').then((data)=>{
        if (data) {
          if (data['username'])this.username=data['username'];
          if (data['password'])this.password=data['password'];
        }
        resolve();
      });
    });
  }

  saveAccount():Promise<null>{
    return this.storage.set('account',{
      username:this.username,
      password:this.password
    });
  }


  autoLogin(){
    this.fetchAccount().then(()=>{
      if (this.username && this.password) {
        this.login(this.username,this.password);
      }
    });
  }

  login(username:string,password:string):Promise<null>{
    return new Promise((resolve, reject) => {
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let  body = new URLSearchParams();
      body.append('func', 'login-session');
      body.append('login_source', 'bor-info');
      body.append('bor_id', username);
      body.append('bor_verification', password);
      body.append('bor_library', 'ZJU50');
      this.http.post(CONST.libraryUrl+`/F`, body.toString(), {
        headers:headers
      }).toPromise().then((response:Response)=>{
        if (response.text().search('校园卡统一身份认证登录')==-1) {
          let alephSessionId=response.text().match(/ALEPH_SESSION_ID ?= ?([A-Z]|\d)+/)[0].replace(/ALEPH_SESSION_ID ?= ?/,'');
          this.cookieSvc.put('ALEPH_SESSION_ID',alephSessionId);
          this.alephSessionId=alephSessionId;
          this.username=username;
          this.password=password;
          this.saveAccount();
          this.freshUserInfo().then(()=>{
            resolve();
          });
        }else{
          this.user=null;
          reject();
        }
      });
    });
  }

  logout(){
    this.user=null;
    this.username=null;
    this.password=null;
    this.saveAccount();
    this.cookieSvc.remove('ALEPH_SESSION_ID');
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
      if (xml.getElementsByTagName('error').length>0){
        throw new Error();
      }
      this.user={
        id:xml.getElementsByTagName('z303-id')[0].childNodes[0].nodeValue,
        name:xml.getElementsByTagName('z303-name')[0].childNodes[0].nodeValue,
        studentId:this.username,
        gender:xml.getElementsByTagName('z303-gender')[0].childNodes[0].nodeValue
      };
    });
  }


  getHistoryBorrows():Promise<HistoryBorrow[]>{
    let options:RequestOptionsArgs={};
    if (window.location.hostname == '') {
      options={
        headers:new Headers({'Cookie': 'ALEPH_SESSION_ID='+this.alephSessionId}),
        withCredentials: true
      };
    }
    return this.http.get(CONST.libraryUrl+'/F?func=bor-history-loan&adm_library=ZJU50',options).toPromise().then((response:Response)=>{
      let html=(new DOMParser()).parseFromString(response.text(),'text/html');
      let table=html.getElementsByTagName('table')[2];
      let borrows:HistoryBorrow[]=[];
      let trs=table.getElementsByTagName('tr');
      for (let i = 1; i < trs.length; i++) {
        let tds=trs[i].getElementsByTagName('td');
        borrows.push({
          bookName:tds[2].innerText,
          author:tds[1].innerText,
          subLibrary:tds[9].innerText,
          returnDate:tds[6].innerText
        });
      }
      return borrows;
    });
  }

}
