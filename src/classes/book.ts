export class LatestBook {
  id:string;
  base:string;
  title:string;
}

export class BookDetail {
  id:string;
  ISBN:string;
  classNumber:string;
  // callNumber:string;
  price:string;
  bindingType:string;
  name:string;
  author:string;
  editor:string;
  press:{
    name:string;
    location:string;
  }={
    name:null,
    location:null
  };
  year:string;
  pageCount:number;
}
