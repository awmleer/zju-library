import { Component } from '@angular/core';


@Component({
  selector: 'search-box',
  templateUrl: 'search-box.html'
})
export class SearchBoxComponent {

  text: string;

  constructor() {
    console.log('Hello SearchBoxComponent Component');
    this.text = 'Hello World';
  }

}
