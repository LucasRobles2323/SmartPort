import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent  implements OnInit {
  selectedTab: any;
  
  constructor() { }

  ngOnInit() {}

  setCurrentTab(event:any){
    this.selectedTab = event.tab;
  }

}
