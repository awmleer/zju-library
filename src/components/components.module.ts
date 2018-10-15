import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box';
import {IonicModule} from "ionic-angular";
import { PagePlaceholderComponent } from './page-placeholder/page-placeholder';

@NgModule({
	declarations: [
	  SearchBoxComponent,
    PagePlaceholderComponent,
  ],
	imports: [
    IonicModule,
  ],
	exports: [
	  SearchBoxComponent,
    PagePlaceholderComponent,
  ]
})
export class ComponentsModule {}
