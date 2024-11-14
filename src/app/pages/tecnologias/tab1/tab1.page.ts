import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  handleRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
