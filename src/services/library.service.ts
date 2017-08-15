import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";
import {BookDetail, LatestBook} from "../classes/book";


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
    return this.http.get(CONFIG.libraryUrl+'/X',{
      params:{
        'op':'find-doc',
        'doc_num':id,
        'base':base
      }
    }).toPromise().then((response:Response)=>{
      let book=new BookDetail();
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      let fixFields=xml.getElementsByTagName('fixfield');
      for (let i = 0; i < fixFields.length; i++) {
        let fixField=fixFields[i];
        let id=fixField.getAttribute('id');
        let value=fixField.childNodes[0].nodeValue;
        if (id == '001') {
          book.id=value;
        }
      }
      let varFields=xml.getElementsByTagName('varfield');
      for(let i=0; i<varFields.length; i++){
        let varField=varFields[i];
        let subFields=varField.getElementsByTagName('subfield');
        for (let j=0; j<subFields.length; j++) {
          let subField=subFields[j];
          let id=varField.getAttribute('id');
          let label=subField.getAttribute('label');
          let nodeValue=subField.childNodes[0].nodeValue;
          if (id=='200' && label=='a'){
            book.name=nodeValue;
          }else if (id=='200' && label=='f') {
            book.author=nodeValue;
          }else if (id=='210' && label=='c') {
            book.press=nodeValue;
          }else if (id == '210' && label == 'd') {
            book.year=nodeValue;
          }else if (id == '215' && label == 'a') {
            book.pageCount=parseInt(nodeValue);
          }
        }
      }
      return book;
    });
  }

}
