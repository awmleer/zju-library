import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookSearchPage } from './book-search';

@NgModule({
  declarations: [
    BookSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BookSearchPage),
  ],
})
export class BookSearchPageModule {}
