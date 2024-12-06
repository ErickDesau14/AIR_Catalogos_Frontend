import { Component, OnInit, ViewChild } from '@angular/core';
import { ListNotificationsComponent } from '../../notificaciones/tab5/components/list-notifications/list-notifications.component';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {

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
