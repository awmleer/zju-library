import { Component } from '@angular/core';

import { CollectionPage } from '../collection/collection';
import { HomePage } from '../home/home';
import {UpdateService} from "../../services/update.service";
import {MePage} from "../me/me";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CollectionPage;
  tab3Root = MePage;

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
