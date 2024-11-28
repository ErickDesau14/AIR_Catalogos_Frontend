import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Experiencia } from 'src/app/models/experiencie';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.scss'],
})
export class ListExperienceComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public experience: Experiencia[];
  public showForm: boolean;

  public nameExperience: string = '';
  public selectedYearExperience: string = '';
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
    this.experience = [];
  }

  ngOnInit() {
    this.getExperience();
  }

  getExperience() {

  }

  selectExperience(item: Experiencia, editMode: boolean = false) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
      this.isReadOnly = false;
    } else {

      this.selectedYearExperience = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

    }

    console.log("Selected Experience Details:", {
      name: this.selectedYearExperience,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  async updateExperience(updatedName: string) {

    if (!updatedName || updatedName.trim().length === 0) {
      await this.alertService.alertError(
        'El nombre de la modalidad no puede estar vacío'
      );
      return;
    }

    // if (this.lastSelectedId !== null) {
    //   const updatedExperience: Experiencia = {
    //     id: this.lastSelectedId,
    //     name: updatedName.trim(),
    //     estatus: 1,
    //     fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
    //     fechaModificacion: new Date(), // Actualiza la fecha de modificación
    //     fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
    //   };
    // }

    this.alertService.alertConfirm(
      '¿Estás seguro de que deseas actualizar el año de experiencia?',
      () => {

      }
    );

  }

  resetForm() {
    this.selectedYearExperience = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';

    this.isEditing = false;
    this.isReadOnly = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivateExperience(idExperience: number) {

    this.resetForm();
  }

}
