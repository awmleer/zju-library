import {Component, Input} from '@angular/core';


@Component({
  selector: 'page-placeholder',
  templateUrl: 'page-placeholder.html'
})
export class PagePlaceholderComponent {

  @Input() icon: string;
  @Input() text: string;

  constructor() {
  }

}
