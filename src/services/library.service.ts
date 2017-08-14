import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";

@Injectable()
export class LibraryService {
  constructor(
    private http: Http
  ) {}

  latestBooks(){
    this.http.get(
      CONFIG.libraryUrl+'/cgi-bin/newbook.cgi?base=ALL&cls=ALL&date=180'
    ).toPromise().then((response:Response)=>{
      console.log(response.text());
      let books;
      function newbook(obj){
        books=obj;
      }
      function nav(){}
      console.log(eval(response.text()));
      return books;
    });
  }


}
