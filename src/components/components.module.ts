import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box';
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [SearchBoxComponent],
	imports: [
    IonicModule,
  ],
	exports: [SearchBoxComponent]
})
export class ComponentsModule {}
