import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Puestos } from 'src/app/models/positions';
import { AlertService } from 'src/app/services/alert.service';
import { PuestoService } from 'src/app/services/puesto.service';

@Component({
  selector: 'app-list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss'],
})
export class ListPositionsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public puestos: Puestos[];
  public showForm: boolean;
  public selectedNamePosition: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private puestoService: PuestoService
  ) {
    this.showForm = false;
    this.puestos = [];
  }

  ngOnInit() {
    this.getPositions();
  }

  getPositions() {
    this.puestoService.getPuestos().subscribe({
      next: (data) => {
        this.puestos = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener los puestos ' + error.message);
      }
    })
  }

  selectPosition(item: Puestos, editMode: boolean = false) {

    if (this.lastSelectedId === item.idPuesto) {
      this.resetForm();
      return;
    }

    this.puestoService.getPuestoById(item.idPuesto).subscribe({
      next: (puesto) => {
        this.selectedNamePosition = puesto.puesto;
        this.selectedCreationDate = puesto.fecha_creacion ? new Date(puesto.fecha_creacion).toISOString().split('T')[0] : '';
        this.selectedModificationDate = puesto.fecha_modificacion ? new Date(puesto.fecha_modificacion).toISOString().split('T')[0] : '';
        this.selectedDeactivationDate = puesto.fecha_baja ? new Date(puesto.fecha_baja).toISOString().split('T')[0] : '';

        this.isEditing = editMode;
        this.isReadOnly = !editMode;
        this.lastSelectedId = item.idPuesto;
        this.content.scrollToTop(500);
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener el puesto ' + error.message);
      }
    });

  }

  desactivatePosition(item: Puestos) {
    const newEstatus = item.estatus === true ? 0 : 1;
    const mensaje = newEstatus === 1
    ? '¿Estás seguro de que deseas activar el puesto?'
    : '¿Estás seguro de que deseas desactivar el puesto?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.puestoService.updateEstatus(item.idPuesto, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getPositions();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar el estatus del puesto ' + error.message);
          }
        })
      }
    );
  }

  async updatePosition(updatedName: string) {

    if (this.lastSelectedId !== null) {
      const updatedPosition: Puestos = {
        puesto: updatedName.trim(),
        estatus: true,
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar el puesto?',
        () => {
          this.puestoService.updatePuesto(this.lastSelectedId, updatedPosition).subscribe({
            next: () => {
              this.alertService.alertSuccess('Puesto actualizado exitosamente');
              this.getPositions();
              this.resetForm();
            },
            error: async (error) => {
              await this.alertService.alertError('Error al actualizar el puesto ' + error.message);
            }
          })
        }
      );
    }
  }

  resetForm() {
    this.selectedNamePosition = '';
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
