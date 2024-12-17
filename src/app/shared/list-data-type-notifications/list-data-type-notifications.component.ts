import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TipoNotificaciones } from 'src/app/models/typeNotifications';
import { AlertService } from 'src/app/services/alert.service';
import { TipoNotificationService } from 'src/app/services/typeNotification.service';

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
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private tipoNotificacionService: TipoNotificationService
  ) { }

  private normalizeModeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  get isTypeNotificationValid(): boolean {
    return this.selectedTypeNotification && this.selectedTypeNotification.trim().length > 0;
  }

  private validateTypeNotificationName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      this.alertService.alertWarning('El tipo de la notificación no puede estar vacío');
      return false;
    }

    const normalizedName = this.normalizeModeName(name);
    const exists = this.data.some((tipoNotificacion: TipoNotificaciones) =>
      this.normalizeModeName(tipoNotificacion.tipoNotificacion).toLowerCase() === normalizedName.toLowerCase()
    );

    if (exists) {
      this.alertService.alertWarning('Ya existe este tipo de notificación');
      return false;
    }

    return true;
  }

  emitUpdateTypeNotification() {
    const normalizedName = this.normalizeModeName(this.selectedTypeNotification);

    if (!this.validateTypeNotificationName(normalizedName)) {
      return;
    }

    this.updateTypeNotification.emit(normalizedName);
  }

  addData() {
    const normalizedName = this.normalizeModeName(this.selectedTypeNotification);

    if (!this.validateTypeNotificationName(normalizedName)) {
      return;
    }

    const newNotification: TipoNotificaciones = {
      tipoNotificacion: normalizedName,
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Estás seguro de agregar este tipo de notificación?',
      () => {
        this.tipoNotificacionService.createTipoNotificacion(newNotification).subscribe({
          next: () => {
            this.alertService.alertSuccess('Tipo de notificación agregada correctamente');
            this.resetFormFields();
            this.typeNotificationAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al agregar el tipo de notificación');
            }
          }
        });
      }
    );
  }

  resetFormFields() {
    this.selectedTypeNotification = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
