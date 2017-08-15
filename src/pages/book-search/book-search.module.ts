import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookSearchPage } from './book-search';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BookSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BookSearchPage),
    ComponentsModule
  ],
})
export class BookSearchPageModule {}
