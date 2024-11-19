import { Component, OnInit } from '@angular/core';
import { Tecnologias } from 'src/app/models/tecnologias';
import { AlertService } from 'src/app/services/alert.service';
import { SqliteManagerService } from 'src/app/services/sqlite-manager.service';

@Component({
  selector: 'app-list-technologies',
  templateUrl: './list-technologies.component.html',
  styleUrls: ['./list-technologies.component.scss'],
})
export class ListTechnologiesComponent  implements OnInit {

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
    private sqliteService: SqliteManagerService,
    private alertService: AlertService
  ) {
    this.showForm = false;
    this.technologies = [];
  }

  ngOnInit() {
    this.getTechnologies();
  }

  getTechnologies() {
    this.sqliteService.getTechnologies().then( (technologies: Tecnologias[]) => {
      this.technologies = technologies;
      console.log(this.technologies);

    })
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

      console.log("Selected Technology Details:", {
        name: this.selectedNameTechnology,
        creationDate: this.selectedCreationDate,
        modificationDate: this.selectedModificationDate,
        deactivationDate: this.selectedDeactivationDate
      });
    }
  }

  updateTechnology(updatedName: string) {

    if (!updatedName || updatedName.trim().length === 0) {
      this.alertService.alertMessage(
        '❌',
        'El nombre de la tecnología no puede editar estar vacío'
      );
      return;
    }

    if (this.lastSelectedId !== null) {
      const updatedTechnology: Tecnologias = {
        id: this.lastSelectedId,
        name: updatedName,
        estatus: 1,
        fechaCreacion: this.selectedCreationDate ? new Date(this.selectedCreationDate) : null,
        fechaModificacion: new Date(),
        fechaBaja: this.selectedDeactivationDate ? new Date(this.selectedDeactivationDate) : null
      };

      this.alertService.alertConfirm(
        'Confirmación',
        '¿Estás seguro de que deseas actualizar la tecnología?',
        () => {
          this.sqliteService.updateTechnology(updatedTechnology)
            .then(() => {
              this.getTechnologies();
              this.resetForm();
            })
            .catch((error) => console.error('Error al actualizar la tecnología:', error));
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
    this.sqliteService.desactivateTechnology(idTecnologia).then( () => {
      this.getTechnologies();
    }).catch( (err) => {
      console.error(err);
    })
  }

}
