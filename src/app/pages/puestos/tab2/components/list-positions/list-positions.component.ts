import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Puestos } from 'src/app/models/positions';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss'],
})
export class ListPositionsComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public puestos: Puestos[];
  public showForm: boolean;

  public namePosition: string = '';
  public selectedNamePosition: string = '';
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
    this.puestos = [];
  }

  ngOnInit() {
    this.getPositions();
  }

  getPositions() {

  }

  selectPosition(item: Puestos, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {

      this.selectedNamePosition = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

    }

    console.log("Selected Position Details:", {
      name: this.selectedNamePosition,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  async updatePosition(updatedName: string) {

    if (!updatedName || updatedName.trim().length === 0) {
      await this.alertService.alertError(
        'El nombre del puesto no puede estar vacío'
      );
      return;
    }

    // if (this.lastSelectedId !== null) {
    //   const updatedPosition: Puestos = {
    //     id: this.lastSelectedId,
    //     name: updatedName.trim(),
    //     estatus: 1,
    //     fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
    //     fechaModificacion: new Date(), // Actualiza la fecha de modificación
    //     fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
    //   };
    // }

    this.alertService.alertConfirm(
      '¿Estás seguro de que deseas actualizar el puesto?',
      () => {

      }
    );

  }

  resetForm() {
    this.selectedNamePosition = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';

    this.isEditing = false;
    this.isReadOnly = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivatePosition(idPuesto: number) {

    this.resetForm();
  }

}
