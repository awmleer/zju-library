import { Component } from '@angular/core';


@Component({
  selector: 'search-box',
  templateUrl: 'search-box.html'
})
export class SearchBoxComponent {
  focusing:boolean=false;

  text: string;

  constructor() {}


}
