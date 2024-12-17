import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TipoNotificaciones } from 'src/app/models/typeNotifications';
import { AlertService } from 'src/app/services/alert.service';
import { TipoNotificationService } from 'src/app/services/typeNotification.service';

@Component({
  selector: 'app-list-type-notifications',
  templateUrl: './list-type-notifications.component.html',
  styleUrls: ['./list-type-notifications.component.scss'],
})
export class ListTypeNotificationsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public typeNotifications: TipoNotificaciones[];
  public showForm: boolean;
  public selectedTypeNotification: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private tipoNotificacionesService: TipoNotificationService
  ) {
    this.showForm = false;
    this.typeNotifications = [];
  }

  ngOnInit() {
    this.getTypeNotifications();
  }

  getTypeNotifications() {
    this.tipoNotificacionesService.getTipoNotificacion().subscribe({
      next: (data) => {
        this.typeNotifications = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener los tipos de notificaciones ' + error.message);
      }
    });
  }

  selectNotification(item: TipoNotificaciones, editMode: boolean = false) {

    if (this.lastSelectedId === item.idTipoNotificacion) {
      this.resetForm();
      return;
    }

    this.tipoNotificacionesService.getTipoNotificacionById(item.idTipoNotificacion).subscribe({
      next: (typeNotification) => {
        this.selectedTypeNotification = typeNotification.tipoNotificacion;
        this.selectedCreationDate = typeNotification.fechaCreacion ? new Date(typeNotification.fechaCreacion).toISOString().split('T')[0] : '';
        this.selectedModificationDate = typeNotification.fechaModificacion ? new Date(typeNotification.fechaModificacion).toISOString().split('T')[0] : '';
        this.selectedDeactivationDate = typeNotification.fechaBaja ? new Date(typeNotification.fechaBaja).toISOString().split('T')[0] : '';
        this.isEditing = editMode;
        this.isReadOnly = !editMode;
        this.lastSelectedId = item.idTipoNotificacion;
        this.content.scrollToTop(500);
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener el tipo de notificación ' + error.message);
      }
    });

  }

  async updateTypeNotification(updatedText: string) {
    if (this.lastSelectedId !== null) {
      const updatedTypeNotification: TipoNotificaciones = {
        tipoNotificacion: updatedText.trim(),
        estatus: 1
      };

      this.alertService.alertConfirm(
        '¿Está seguro de actualizar este tipo de notificación?',
        () => {
          this.tipoNotificacionesService.updateTipoNotificacion(this.lastSelectedId, updatedTypeNotification).subscribe({
            next: () => {
              this.alertService.alertSuccess('Tipo de notificación actualizada correctamente');
              this.getTypeNotifications();
              this.resetForm();
            },
            error: () => {
              this.alertService.alertError('Error al actualizar este tipo de notificación');
            }
          });
        }
      );
    }
  }

  desactivateTypeNotification(item: TipoNotificaciones) {
    const newEstatus = item.estatus === 1 ? 0 : 1;
    const mensaje = newEstatus === 1
      ? '¿Está seguro de activar este tipo de notificación?'
      : '¿Está seguro de desactivar este tipo notificación?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.tipoNotificacionesService.updateEstatus(item.idTipoNotificacion, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getTypeNotifications();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar el estatus del tipo de notificación ' + error.message);
          }
        });
      }
    );
  }

  resetForm() {
    this.selectedTypeNotification = '';
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
