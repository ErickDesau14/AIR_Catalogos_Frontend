import { Component, ViewChild } from '@angular/core';
import { ListPositionsComponent } from './components/list-positions/list-positions.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(ListPositionsComponent) listPositionsComponent!: ListPositionsComponent;

  constructor() {}

  handleRefresh(event: any) {

    if (this.listPositionsComponent) {
      this.listPositionsComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
