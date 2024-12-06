import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-data-notifications',
  templateUrl: './list-data-notifications.component.html',
  styleUrls: ['./list-data-notifications.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule]
})
export class ListDataNotificationsComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;
  @Input() isEditing: boolean = false;

  @Input() textNotification: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedTextNotification: string = '';

  @Output() notificationAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateNotification = new EventEmitter<string>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService
  ) { }

  get isTextNotificationValid(): boolean {
    return this.selectedTextNotification && this.selectedTextNotification.trim().length > 0;
  }

  emitUpdateNotification() {
    this.updateNotification.emit(this.selectedTextNotification);
  }

  addData() {

    if (!this.selectedTextNotification) {
      this.alertService.alertError(
        'El nombre de la notificación no puede estar vacío',
      );
      return;
    }

    // const normalizedTechnologyName = this.selectedNameTechnology.replace(/\s+/g, '').toLowerCase();

    // this.sqliteManager.technologyExists(normalizedTechnologyName)
    // .then((exists) => {
    //   if (exists) {
    //     this.alertService.alertWarning('Esta tecnología ya existe');
    //     return;
    //   }
    // });

  }

}
