import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-data-type-notifications',
  templateUrl: './list-data-type-notifications.component.html',
  styleUrls: ['./list-data-type-notifications.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule ]
})
export class ListDataTypeNotificationsComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;
  @Input() isEditing: boolean = false;

  @Input() TypeNotification: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedTypeNotification: string = '';

  @Output() typeNotificationAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateTypeNotification = new EventEmitter<string>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService
  ) { }

  get isTypeNotificationValid(): boolean {
    return this.selectedTypeNotification && this.selectedTypeNotification.trim().length > 0;
  }

  emitUpdateTypeNotification() {
    this.updateTypeNotification.emit(this.selectedTypeNotification);
  }

  addData() {

    if (!this.selectedTypeNotification) {
      this.alertService.alertError(
        'El tipo de la notificación no puede estar vacío',
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
