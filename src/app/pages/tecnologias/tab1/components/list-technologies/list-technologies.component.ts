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

  public isReadOnly: boolean = true;

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
    this.selectedNameTechnology = item.name || '';
    this.selectedCreationDate = item.fechaCreacion ? new Date(item.fechaCreacion).toISOString().split('T')[0] : '';
    this.selectedModificationDate = item.fechaModificacion ? new Date(item.fechaModificacion).toISOString().split('T')[0] : '';
    this.selectedDeactivationDate = item.fechaBaja ? new Date(item.fechaBaja).toISOString().split('T')[0] : '';

    console.log("Selected Technology Details:", {
      name: this.selectedNameTechnology,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });

    this.isReadOnly = true;

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
