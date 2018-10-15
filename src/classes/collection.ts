import * as AV from 'leancloud-storage';

export class BookCollection extends AV.Object {
  attributes: {
    userId: string;
    bookId: string;
    title: string;
    author: string;
    classNumber: string;
    press: string;
    year: string;
  };
}
