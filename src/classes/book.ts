export class LatestBook {
  id:string;
  base:string;
  title:string;
}

export class HotBook {
  id:string;
  base:string;
  title:string;
}

export class BookRecord {
  id:string;
  ISBN:string;
  title:string;
  author:string;
  editor:string;
  press:string;
  year:string;
}

export class BookDetail {
  id:string;
  ISBN:string;
  classNumber:string;
  // callNumber:string;
  price:string;
  bindingType:string;
  title:string;
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


export class BookItem {
  callNumber:string;
  status:string;
  barcode:string;
  subLibrary:string;
  requested:boolean=false;
  onHold:boolean=false;
  borrowed:boolean=false;
  dueDate:string=null;
}

export class BookDouban {
  tags:{
    count:number;
    name:string;
    title:string;
  }[];
  rating:{
    max:number;
    numRaters:number;
    average:number;
    min:number;
  };
  image:string;
  summary:string;
  authorIntro:string;
  catalog:string;
}
