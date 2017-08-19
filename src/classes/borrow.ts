class Borrow {
  bookName:string;
  author:string;
  subLibrary:string;
}

export class CurrentBorrow extends Borrow {
  dueDate:string;
}

export class HistoryBorrow extends Borrow {
  returnDate:string;
}
