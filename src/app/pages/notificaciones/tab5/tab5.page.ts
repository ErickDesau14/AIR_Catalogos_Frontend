import { Component, OnInit, ViewChild } from '@angular/core';
import { ListNotificationsComponent } from './components/list-notifications/list-notifications.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {

  @ViewChild(ListNotificationsComponent) listNotificationsComponent!: ListNotificationsComponent;

  constructor() { }

  handleRefresh(event: any) {

    if (this.listNotificationsComponent) {
      this.listNotificationsComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
