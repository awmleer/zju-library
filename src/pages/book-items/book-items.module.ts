import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookItemsPage } from './book-items';

@NgModule({
  declarations: [
    BookItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookItemsPage),
  ],
})
export class BookItemsPageModule {}
