import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowHistoryPage } from './borrow-history';

@NgModule({
  declarations: [
    BorrowHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowHistoryPage),
  ],
})
export class BorrowHistoryPageModule {}
