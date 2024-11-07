import { Component, OnInit } from '@angular/core';
import { Tecnologias } from 'src/app/models/tecnologias';
import { SqliteManagerService } from 'src/app/services/sqlite-manager.service';

@Component({
  selector: 'app-list-technologies',
  templateUrl: './list-technologies.component.html',
  styleUrls: ['./list-technologies.component.scss'],
})
export class ListTechnologiesComponent  implements OnInit {

  public technologies: Tecnologias[];
  public showForm: boolean;

  public selectedNameTechnology: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';

  public isEditing: boolean = false;

  public lastSelectedId: number | null = null;

  constructor(
    private sqliteService: SqliteManagerService
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

  selectTechnology(item: Tecnologias) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
    } else {

      this.selectedNameTechnology = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = true;
      this.lastSelectedId = item.id;

    }
    
    console.log("Selected Technology Details:", {
      name: this.selectedNameTechnology,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });

  }

  updateTechnology() {
    this.resetForm();
  }

  resetForm() {
    this.selectedNameTechnology = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    
    this.isEditing = false;
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
