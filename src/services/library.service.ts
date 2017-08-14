import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";
import {LatestBook} from "../classes/book";

@Injectable()
export class LibraryService {
  constructor(
    private http: Http
  ) {}

  latestBooks():Promise<any>{
    return this.http.get(
      CONFIG.libraryUrl+'/cgi-bin/newbook.cgi?base=ALL&cls=ALL&date=180'
    ).toPromise().then((response:Response)=>{
      console.log(response.text());
      let books:LatestBook[]=[];
      function newbook(obj){
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            books.push({
              id:key,
              base:obj[key].b,
              title: obj[key].t
            });
          }
        }
      }
      function nav(){}
      console.log(eval(response.text()));
      return books;
    });
  }

  bookDetail(base,id){
    return this.http.get(CONFIG.libraryUrl+'/F/8AUFJHGX6F5FVJX2KBGMKRE4E6A2832TL2YCC3RXJF1CX9P6CR-18682'+`?func=find-b&find_code=SYS&local_base=${base}&request=${id}`).toPromise().then((response:Response)=>{
      console.log(response.text());
      return response.text();
    })
  }

}
