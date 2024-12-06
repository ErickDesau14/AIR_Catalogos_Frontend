import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TipoNotificacciones } from 'src/app/models/typeNotifications';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-type-notifications',
  templateUrl: './list-type-notifications.component.html',
  styleUrls: ['./list-type-notifications.component.scss'],
})
export class ListTypeNotificationsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public typeNotifications: TipoNotificacciones[];
  public showForm: boolean;

  public typeNotification: string = '';
  public selectedTypeNotification: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';

  public isEditing: boolean = false;
  public isReadOnly: boolean = false;

  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService
  ) {
    this.showForm = false;
    this.typeNotifications = [];
  }

  ngOnInit() {
    this.getTypeNotifications();
  }

  getTypeNotifications() {

  }

  selectNotification(item: TipoNotificacciones, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {
      this.selectedTypeNotification = item.tipoNotificacion || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

      console.log("Selected Details:", {
        tipoNotificacion: this.selectedTypeNotification,
        creationDate: this.selectedCreationDate,
        modificationDate: this.selectedModificationDate,
        deactivationDate: this.selectedDeactivationDate
      });
    }

  }

  async updateTypeNotification(updatedText: string) {

    if (!updatedText || updatedText.trim().length === 0) {
      await this.alertService.alertError(
        'El texto del tipo de la notificación no puede estar vacío'
      );
      return;
    }

    if (this.lastSelectedId !== null) {
      const updatedTypeNotification: TipoNotificacciones = {
        id: this.lastSelectedId,
        tipoNotificacion: updatedText.trim(),
        estatus: 1,
        fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
        fechaModificacion: new Date(),
        fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar el tipo de notificación?',
        () => {

        }
      );
    }
  }

  resetForm() {
    this.selectedTypeNotification = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';

    this.isEditing = false;
    this.isReadOnly = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivateTechnology(idTecnologia: number) {
    this.resetForm();
  }

}
