import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Tecnologias } from 'src/app/models/tecnologias';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-technologies',
  templateUrl: './list-technologies.component.html',
  styleUrls: ['./list-technologies.component.scss'],
})
export class ListTechnologiesComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public technologies: Tecnologias[];
  public showForm: boolean;

  public nameTechnology: string = '';
  public selectedNameTechnology: string = '';
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
    this.technologies = [];
  }

  ngOnInit() {
    this.getTechnologies();
  }

  getTechnologies() {

  }

  selectTechnology(item: Tecnologias, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {
      this.selectedNameTechnology = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

      console.log("Selected Technology Details:", {
        name: this.selectedNameTechnology,
        creationDate: this.selectedCreationDate,
        modificationDate: this.selectedModificationDate,
        deactivationDate: this.selectedDeactivationDate
      });
    }
  }

  async updateTechnology(updatedName: string) {

    if (!updatedName || updatedName.trim().length === 0) {
      await this.alertService.alertError(
        'El nombre de la tecnología no puede estar vacío'
      );
      return;
    }

    if (this.lastSelectedId !== null) {
      const updatedTechnology: Tecnologias = {
        id: this.lastSelectedId,
        name: updatedName.trim(),
        estatus: 1,
        fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
        fechaModificacion: new Date(),
        fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar la tecnología?',
        () => {

        }
      );
    }
  }

  resetForm() {
    this.selectedNameTechnology = '';
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
