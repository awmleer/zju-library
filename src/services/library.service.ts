import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONST} from "../app/const";
import {BookDetail, BookItem, BookRecord, LatestBook} from "../classes/book";


@Injectable()
export class LibraryService {
  constructor(
    private http: Http
  ) {}

  latestBooks():Promise<LatestBook[]>{
    return this.http.get(
      CONST.libraryUrl+'/cgi-bin/newbook.cgi?base=ALL&cls=ALL&date=180'
    ).toPromise().then((response:Response)=>{
      // console.log(response.text());
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
      eval(response.text());
      return books;
    });
  }

  bookDetail(base,id):Promise<BookDetail>{
    return this.http.get(CONST.libraryUrl+'/X',{
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
          if (id=='200'){
            if (label == 'a') {
              book.title=nodeValue;
            }else if (label == 'f') {
              book.author=nodeValue;
            }else if (label == 'g') {
              book.editor=nodeValue;
            }
          }else if (id=='210') {
            if (label == 'c') {
              book.press.name=nodeValue;
            }else if (label == 'd') {
              book.year=nodeValue;
            }else if (label == 'a') {
              book.press.location=nodeValue;
            }
          }else if (id == '215' && label == 'a') {
            book.pageCount=parseInt(nodeValue);
          }else if (id == '010') {
            if (label == 'a') {
              book.ISBN=nodeValue;
            }else if (label == 'b') {
              book.bindingType=nodeValue;
            }else if (label == 'd') {
              book.price=nodeValue;
            }
          }else if (id == '690') {
            if (label == 'a') {
              book.classNumber=nodeValue;
            }
          }
        }
      }
      return book;
    });
  }


  bookItems(base,id):Promise<BookItem[]>{
    return this.http.get(CONST.libraryUrl+'/X',{
      params:{
        'op':'item-data',
        'doc_num':id,
        'base':base
      }
    }).toPromise().then((response:Response)=>{
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      let items:BookItem[]=[];
      let xmlItems=xml.getElementsByTagName('item');
      for (let i = 0; i < xmlItems.length; i++) {
        let xmlItem=xmlItems[i];
        let item=new BookItem();
        let temp;
        temp=xmlItem.getElementsByTagName('call-no-1');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.callNumber=temp[0].childNodes[0].nodeValue;
        temp=xmlItem.getElementsByTagName('barcode');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.barcode=temp[0].childNodes[0].nodeValue;
        temp=xmlItem.getElementsByTagName('sub-library');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.subLibrary=temp[0].childNodes[0].nodeValue;
        temp=xmlItem.getElementsByTagName('requested');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.requested=(temp[0].childNodes[0].nodeValue=='Y');
        temp=xmlItem.getElementsByTagName('status');
        if(temp.length>0&&temp[0].childNodes.length>0){
          let statusCode=temp[0].childNodes[0].nodeValue;
          switch (statusCode){
            case '21': item.status='图书阅览';break;
            case '12': item.status='普通借阅';break;
            case '11': item.status='编目中';break;
            default: item.status='未知';
          }
        }
        temp=xmlItem.getElementsByTagName('loan-status');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.borrowed=(temp[0].childNodes[0].nodeValue=='A');
        temp=xmlItem.getElementsByTagName('on-hold');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.onHold=(temp[0].childNodes[0].nodeValue=='Y');
        temp=xmlItem.getElementsByTagName('loan-due-date');
        if(temp.length>0&&temp[0].childNodes.length>0)
          item.dueDate=temp[0].childNodes[0].nodeValue;
        items.push(item);
      }
      return items;
    });
  }


  search(text:string):Promise<{setId:string;totalCount:number;}>{
    return this.http.get(CONST.libraryUrl+'/X',{
      params:{
        'op':'find',
        'code':'wrd',
        'request':text,
        'base':'ZJU01'
      }
    }).toPromise().then((response:Response)=>{
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      if (xml.getElementsByTagName('error').length > 0) {//search error (eg. empty set)
        return {
          setId:null,
          totalCount:0
        };
      }
      return {
        setId: xml.getElementsByTagName('set_number')[0].childNodes[0].nodeValue,
        totalCount: parseInt(
          xml.getElementsByTagName('no_records')[0].childNodes[0].nodeValue
        )
      };
    });
  }

  present(start:number,length:number,setId:string):Promise<BookRecord[]>{
    return this.http.get(CONST.libraryUrl+'/X',{
      params:{
        'op':'present',
        'set_entry':`${start}-${start+length-1}`,
        'set_number':setId,
        'base':'ZJU01'
      }
    }).toPromise().then((response:Response)=>{
      let xml=(new DOMParser()).parseFromString(response.text(),'text/xml');
      let records=xml.getElementsByTagName('record');
      let books:BookRecord[]=[];
      for (let k = 0; k < records.length; k++) {
        let record=records[k];
        let book=new BookRecord();
        book.id=record.getElementsByTagName('doc_number')[0].childNodes[0].nodeValue;
        let varFields=record.getElementsByTagName('varfield');
        for(let i=0; i<varFields.length; i++){
          let varField=varFields[i];
          let subFields=varField.getElementsByTagName('subfield');
          for (let j=0; j<subFields.length; j++) {
            let subField=subFields[j];
            let id=varField.getAttribute('id');
            let label=subField.getAttribute('label');
            let nodeValue=subField.childNodes[0].nodeValue;
            if (id=='200'){
              if (label == 'a') {
                book.title=nodeValue;
              }else if (label == 'f') {
                book.author=nodeValue;
              }else if (label == 'g') {
                book.editor=nodeValue;
              }
            }else if (id=='210') {
              if (label == 'c') {
                book.press=nodeValue;
              }else if (label == 'd') {
                book.year=nodeValue;
              }
            }else if (id == '010') {
              if (label == 'a') {
                book.ISBN=nodeValue;
              }
            }
          }
        }
        books.push(book);
      }
      return books;
    });
  }

}
