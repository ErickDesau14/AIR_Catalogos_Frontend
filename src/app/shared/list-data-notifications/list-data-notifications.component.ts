import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notificaciones } from '../../models/notifications';

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
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  private normalizeModeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  get isTextNotificationValid(): boolean {
    return this.selectedTextNotification && this.selectedTextNotification.trim().length > 0;
  }

  private validateNotificationName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      this.alertService.alertWarning('El texto de la notificación no puede estar vacío');
      return false;
    }

    const normalizedName = this.normalizeModeName(name);
    const exists = this.data.some((notificacion: Notificaciones) =>
      this.normalizeModeName(notificacion.texto).toLowerCase() === normalizedName.toLowerCase()
    );

    if (exists) {
      this.alertService.alertWarning('Ya existe esta notificación');
      return false;
    }

    return true;
  }

  emitUpdateNotification() {
    const normalizedName = this.normalizeModeName(this.selectedTextNotification);

    if (!this.validateNotificationName(normalizedName)) {
      return;
    }

    this.updateNotification.emit(normalizedName);
  }

  addData() {
    const normalizedName = this.normalizeModeName(this.selectedTextNotification);

    if (!this.validateNotificationName(normalizedName)) {
      return;
    }

    const newNotification: Notificaciones = {
      texto: normalizedName,
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Estás seguro de agregar esta notificación?',
      () => {
        this.notificationService.createNotificacion(newNotification).subscribe({
          next: () => {
            this.alertService.alertSuccess('Notificación agregada correctamente');
            this.resetFormFields();
            this.notificationAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al agregar el mensaje de notificación');
            }
          }
        });
      }
    );
  }

  resetFormFields() {
    this.selectedTextNotification = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
