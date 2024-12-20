import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Modalidad } from 'src/app/models/mode';
import { AlertService } from 'src/app/services/alert.service';
import { ModalidadService } from 'src/app/services/modalidad.service';

@Component({
  selector: 'app-list-mode',
  templateUrl: './list-mode.component.html',
  styleUrls: ['./list-mode.component.scss'],
})
export class ListModeComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public modality: Modalidad[];
  public showForm: boolean;
  public nameMode: string = '';
  public selectedNameMode: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private modalidadService: ModalidadService
  ) {
    this.showForm = false;
    this.modality = [];
  }

  ngOnInit() {
    this.getModality();
  }

  getModality() {
    this.modalidadService.getModalidad().subscribe({
      next: (data) => {
        this.modality = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener las modalidades ' + error.message);
      }
    });
  }

  selectMode(item: Modalidad, editMode: boolean = false) {
    if (this.lastSelectedId === item.idModalidad) {
      this.resetForm();
      return;
    }

    this.modalidadService.getModalidadById(item.idModalidad).subscribe({
      next: (modalidad) => {
        this.selectedNameMode = modalidad.modalidad;
        this.selectedCreationDate = modalidad.fecha_creacion ? new Date(modalidad.fecha_creacion).toISOString().split('T')[0] : '';
        this.selectedModificationDate = modalidad.fecha_modificacion ? new Date(modalidad.fecha_modificacion).toISOString().split('T')[0] : '';
        this.selectedDeactivationDate = modalidad.fecha_baja ? new Date(modalidad.fecha_baja).toISOString().split('T')[0] : '';
        this.isEditing = editMode;
        this.isReadOnly = !editMode;
        this.lastSelectedId = item.idModalidad;
        this.content.scrollToTop(500);
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener la modalidad ' + error.message);
      }
    });
  }

  async updateMode(updatedName: string) {
    if (this.lastSelectedId !== null) {
      const updatedMode: Modalidad = {
        modalidad: updatedName.trim(),
        estatus: true
      };

      this.alertService.alertConfirm(
        '¿Está seguro de actualizar esta modalidad?',
        () => {
          this.modalidadService.updateModalidad(this.lastSelectedId, updatedMode).subscribe({
            next: () => {
              this.alertService.alertSuccess('Modalidad actualizada correctamente');
              this.getModality();
              this.resetForm();
            },
            error: () => {
              this.alertService.alertError('Error al actualizar la modalidad');
            }
          })
        }
      );
    }
  }

  desactivateMode(item: Modalidad) {
    const newEstatus = item.estatus === true ? 0 : 1;
    const mensaje = newEstatus === 1
      ? '¿Está seguro de activar este modalidad?'
      : '¿Está seguro de desactivar esta modalidad?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.modalidadService.updateEstatus(item.idModalidad, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getModality();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar el estatus de la modalidad ' + error.message);
          }
        })
      }
    )
  }

  resetForm() {
    this.selectedNameMode = '';
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
