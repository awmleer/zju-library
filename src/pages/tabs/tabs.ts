import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { CollectionPage } from '../collection/collection';
import { HomePage } from '../home/home';
import {UpdateService} from "../../services/update.service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CollectionPage;
  tab3Root = AboutPage;

  constructor(
    private updateSvc: UpdateService
  ) {}

  get hasNewVersion():boolean{
    return this.updateSvc.hasNewVersion;
  }

  ngOnInit(){
    setTimeout(()=>{
      this.updateSvc.checkUpdate();
    },1000);
  }

}
