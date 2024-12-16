import { Component, ViewChild } from '@angular/core';
import { ListModeComponent } from './components/list-mode/list-mode.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  @ViewChild(ListModeComponent) listModeComponent!: ListModeComponent;

  constructor() { }

  handleRefresh(event: any) {

    if (this.listModeComponent) {
      this.listModeComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
