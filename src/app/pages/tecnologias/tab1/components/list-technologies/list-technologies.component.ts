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

  onShowForm() {
    this.showForm = true;
  }

}
