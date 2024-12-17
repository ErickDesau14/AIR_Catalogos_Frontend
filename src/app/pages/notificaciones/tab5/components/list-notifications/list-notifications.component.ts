import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Notificaciones } from 'src/app/models/notifications';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss'],
})
export class ListNotificationsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public notifications: Notificaciones[];
  public showForm: boolean;
  public selectedTextNotification: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private notificationService: NotificationService
  ) {
    this.showForm = false;
    this.notifications = [];
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotificacion().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener las notificaciones ' + error.message);
      }
    });
  }

  selectNotification(item: Notificaciones, editMode: boolean = false) {

    if (this.lastSelectedId === item.idNotificacion) {
      this.resetForm();
      return;
    }

    this.notificationService.getNotificacionById(item.idNotificacion).subscribe({
      next: (notification) => {
        this.selectedTextNotification = notification.texto;
        this.selectedCreationDate = notification.fechaCreacion ? new Date(notification.fechaCreacion).toISOString().split('T')[0] : '';
        this.selectedModificationDate = notification.fechaModificacion ? new Date(notification.fechaModificacion).toISOString().split('T')[0] : '';
        this.selectedDeactivationDate = notification.fechaBaja ? new Date(notification.fechaBaja).toISOString().split('T')[0] : '';
        this.isEditing = editMode;
        this.isReadOnly = !editMode;
        this.lastSelectedId = item.idNotificacion;
        this.content.scrollToTop(500);
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener la notificación ' + error.message);
      }
    });

  }

  async updateNotification(updatedText: string) {

    if (this.lastSelectedId !== null) {
      const updatedMode: Notificaciones = {
        texto: updatedText.trim(),
        estatus: 1
      };

      this.alertService.alertConfirm(
        '¿Está seguro de actualizar esta modalidad?',
        () => {
          this.notificationService.updateNotificacion(this.lastSelectedId, updatedMode).subscribe({
            next: () => {
              this.alertService.alertSuccess('Notificación actualizada correctamente');
              this.getNotifications();
              this.resetForm();
            },
            error: () => {
              this.alertService.alertError('Error al actualizar esta notificación');
            }
          })
        }
      );
    }

  }

  desactivateNotification(item: Notificaciones) {
    const newEstatus = item.estatus === 1 ? 0 : 1;
    const mensaje = newEstatus === 1
      ? '¿Está seguro de activar este notificación?'
      : '¿Está seguro de desactivar esta notificación?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.notificationService.updateEstatus(item.idNotificacion, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getNotifications();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar el estatus de la notificación ' + error.message);
          }
        })
      }
    )
  }

  resetForm() {
    this.selectedTextNotification = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.lastSelectedId = null;
  }

  onShowForm() {
    this.showForm = true;
  }

}
