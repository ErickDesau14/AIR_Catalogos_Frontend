import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Modalidad } from 'src/app/models/mode';
import { AlertService } from 'src/app/services/alert.service';
import { SqliteManagerService } from 'src/app/services/sqlite-manager.service';

@Component({
  selector: 'app-list-mode',
  templateUrl: './list-mode.component.html',
  styleUrls: ['./list-mode.component.scss'],
})
export class ListModeComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public modality: Modalidad[];
  public showForm: boolean;

  public selectedMode: string = '';
  public selectedNameMode: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';

  public isEditing: boolean = false;
  public isReadOnly: boolean = false;

  public lastSelectedId: number | null = null;

  constructor(
    private sqliteService: SqliteManagerService,
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

      this.selectedMode = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = editMode;
      this.isReadOnly = !editMode;
      this.lastSelectedId = item.id;
      this.content.scrollToTop(500);

    }

    console.log("Selected Mode Details:", {
      mode: this.selectedMode,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  updateMode() {
    this.resetForm();
  }

  resetForm() {
    this.selectedMode = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    this.isEditing = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivateMode(idModalidad: number) {

  }

}
