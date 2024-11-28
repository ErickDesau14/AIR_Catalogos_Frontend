import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencie';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.scss'],
})
export class ListExperienceComponent  implements OnInit {

  public experience: Experiencia[];
  public showForm: boolean;

  public selectedYearExperience: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';

  public isEditing: boolean = false;

  public lastSelectedId: number | null = null;

  constructor() {
    this.showForm = false;
    this.experience = [];
  }

  ngOnInit() {
    this.getExperience();
  }

  getExperience() {

  }

  selectExperience(item: Experiencia) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
    } else {

      this.selectedYearExperience = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = true;
      this.lastSelectedId = item.id;

    }

    console.log("Selected Experience Details:", {
      name: this.selectedYearExperience,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  updateExperience() {
    this.resetForm();
  }

  resetForm() {
    this.selectedYearExperience = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    this.isEditing = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivateExperience(idExperience: number) {

  }

}
