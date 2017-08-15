import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";
import {BookDetail, LatestBook} from "../classes/book";
// import * as cheerio from 'cheerio';
import * as xmlConverter from 'xml-js';

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
      // let json=xmlConverter.xml2json(response.text(),{
      //   compact:true
      // });
      // let obj=JSON.parse(json);
      // console.log(obj);
      let book=new BookDetail();
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      let varFields=xml.getElementsByTagName('varfield');
      for(let i=0; i<varFields.length; i++){
        let varField=varFields[i];
        let subFields=varField.getElementsByTagName('subfield');
        for (let j=0; j<subFields.length; j++) {
          let subField=subFields[j];
          if (varField.getAttribute('id') == '200' && subField.getAttribute('label') == 'a'){
            book.name=subField.childNodes[0].nodeValue;
          }
        }
      }
      // for(let f of obj['find-doc']['record']['metadata']['oai_marc']['varfield']){
      //   if (f['subfield']['_attributes']['label']=='a' && f['_attributes']['id']=='200') {
      //     book.name=f['subfield']['_text'];
      //   }
      // }
      return book;
    });
    // return this.http.get(CONFIG.libraryUrl+'/F/8AUFJHGX6F5FVJX2KBGMKRE4E6A2832TL2YCC3RXJF1CX9P6CR-18682'+`?func=find-b&find_code=SYS&local_base=${base}&request=${id}`).toPromise().then((response:Response)=>{
    //   console.log(response.text());
    //   let $=cheerio.load(response.text());
    //   console.log($('#content_item_list_table').find('tr').each((i,element)=>{
    //     console.log($(element));
    //     console.log($(element).text());
    //   }));
    //   // console.log($.parseHtml(response.text()));
    //   return response.text();
    // })
  }

}
