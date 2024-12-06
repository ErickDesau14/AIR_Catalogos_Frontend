import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Notificaciones } from 'src/app/models/notifications';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss'],
})
export class ListNotificationsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public notifications: Notificaciones[];
  public showForm: boolean;

  public textNotification: string = '';
  public selectedTextNotification: string = '';
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
    this.notifications = [];
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {

  }

  selectNotification(item: Notificaciones, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {
      this.selectedTextNotification = item.texto || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

      console.log("Selected Details:", {
        texto: this.selectedTextNotification,
        creationDate: this.selectedCreationDate,
        modificationDate: this.selectedModificationDate,
        deactivationDate: this.selectedDeactivationDate
      });
    }

  }

  async updateNotification(updatedText: string) {

    if (!updatedText || updatedText.trim().length === 0) {
      await this.alertService.alertError(
        'El texto de la notificación no puede estar vacío'
      );
      return;
    }

    if (this.lastSelectedId !== null) {
      const updatedNotification: Notificaciones = {
        id: this.lastSelectedId,
        texto: updatedText.trim(),
        estatus: 1,
        fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
        fechaModificacion: new Date(),
        fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar el texto de la notificación?',
        () => {

        }
      );
    }
  }

  resetForm() {
    this.selectedTextNotification = '';
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
