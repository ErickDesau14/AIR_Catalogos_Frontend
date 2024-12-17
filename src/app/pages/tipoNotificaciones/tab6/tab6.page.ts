import { Component, OnInit, ViewChild } from '@angular/core';
import { ListNotificationsComponent } from '../../notificaciones/tab5/components/list-notifications/list-notifications.component';
import { ListTypeNotificationsComponent } from './components/list-type-notifications/list-type-notifications.component';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {

  @ViewChild(ListTypeNotificationsComponent) listTypeNotificationsComponent!: ListTypeNotificationsComponent;

  constructor() { }

  handleRefresh(event: any) {

    if (this.listTypeNotificationsComponent) {
      this.listTypeNotificationsComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
