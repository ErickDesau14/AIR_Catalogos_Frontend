import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Modalidad } from 'src/app/models/mode';
import { AlertService } from 'src/app/services/alert.service';

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
    private alertService: AlertService
  ) {
    this.showForm = false;
    this.modality = [];
  }

  ngOnInit() {
    this.getModality();
  }

  getModality() {

  }

  selectMode(item: Modalidad, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {

      this.selectedNameMode = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

    }

    console.log("Selected Mode Details:", {
      mode: this.selectedNameMode,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  async updateMode(updatedName: string) {

    if (!updatedName || updatedName.trim().length === 0) {
      await this.alertService.alertError(
        'El nombre de la modalidad no puede estar vacío'
      );
      return;
    }

    // if (this.lastSelectedId !== null) {
    //   const updatedMode: Modalidad = {
    //     id: this.lastSelectedId,
    //     name: updatedName.trim(),
    //     estatus: 1,
    //     fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
    //     fechaModificacion: new Date(), // Actualiza la fecha de modificación
    //     fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
    //   };
    // }

    this.alertService.alertConfirm(
      '¿Estás seguro de que deseas actualizar la modalidad?',
      () => {

      }
    );

  }

  resetForm() {
    this.selectedNameMode = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';

    this.isEditing = false;
    this.isReadOnly = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivateMode(idModalidad: number) {

    this.resetForm();
  }

}
