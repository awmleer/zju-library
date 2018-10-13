import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";
import {User} from "../classes/user";
import {Storage} from "@ionic/storage";
import {HistoryBorrow} from "../classes/borrow";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LeanService} from './lean.service'


@Injectable()
export class AccountService {
  private username:string;
  private password:string;
  user:User;
  private alephSessionId:string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private leanSvc: LeanService,
  ) {}

  fetchAccount():Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.storage.get('account').then((data)=>{
        if (data) {
          if (data['username'])this.username=data['username'];
          if (data['password'])this.password=data['password'];
        }
        resolve();
      });
    });
  }

  saveAccount():Promise<void>{
    return this.storage.set('account',{
      username:this.username,
      password:this.password
    });
  }


  autoLogin():Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.fetchAccount().then(()=>{
        if (this.username && this.password) {
          this.logIn(this.username,this.password).then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
        }
      });
    });
  }

  async logIn(username:string, password:string):Promise<void>{
    console.log(this.leanSvc.AV.User.current());
    await this.leanSvc.AV.User.logIn(username, password);
  }

  async signUp(username:string, password:string) {
    await this.leanSvc.AV.User.signUp(username, password);
  }

  logout(){
    this.user=null;
    this.username=null;
    this.password=null;
    this.saveAccount();
    // this.cookieSvc.remove('ALEPH_SESSION_ID');
  }

  freshenUserInfo():Promise<void>{
    return this.http.get(CONST.libraryUrl+'/X',{
      params:{
        'op':'bor-info',
        'bor_id':this.username,
        'verification':this.password
      },
      responseType: 'text'
    }).toPromise().then((data)=>{
      let xml=(new DOMParser()).parseFromString(data,'text/xml');
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


  // getHistoryBorrows():Promise<HistoryBorrow[]>{
  //   let httpOptions={
  //     responseType: 'text'
  //   };
  //   if (window.location.hostname == '') {
  //     httpOptions['headers']=new HttpHeaders({'Cookie': 'ALEPH_SESSION_ID='+this.alephSessionId});
  //     httpOptions['withCredentials']=true;
  //   }
  //   return this.http.get(CONST.libraryUrl+'/F?func=bor-history-loan&adm_library=ZJU50',httpOptions).toPromise().then((data)=>{
  //     let html=(new DOMParser()).parseFromString(data,'text/html');
  //     let table=html.getElementsByTagName('table')[2];
  //     let borrows:HistoryBorrow[]=[];
  //     let trs=table.getElementsByTagName('tr');
  //     for (let i = 1; i < trs.length; i++) {
  //       let tds=trs[i].getElementsByTagName('td');
  //       borrows.push({
  //         bookName:tds[2].innerText,
  //         author:tds[1].innerText,
  //         subLibrary:tds[9].innerText,
  //         returnDate:tds[6].innerText
  //       });
  //     }
  //     return borrows;
  //   });
  // }

}
