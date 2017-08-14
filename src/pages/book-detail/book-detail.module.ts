import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailPage } from './book-detail';

@NgModule({
  declarations: [
    BookDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailPage),
  ],
})
export class BookDetailPageModule {}
