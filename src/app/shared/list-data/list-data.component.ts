import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Tecnologias } from 'src/app/models/tecnologias';
import { SqliteManagerService } from 'src/app/services/sqlite-manager.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule ]
})
export class ListDataComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;

  @Output() technologyAdded: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  public nameTechnology: string;

  constructor(
    private sqliteManager: SqliteManagerService
  ) {
    
  }

  get isNameTechnologyValid(): boolean {
    return this.nameTechnology && this.nameTechnology.trim().length > 0;
  }

  addData() {
    if (!this.nameTechnology) {
      console.warn('El nombre de la tecnología está vacío');
      return;
    }

    this.sqliteManager.technologyExists(this.nameTechnology)
    .then((exists) => {
      if (exists) {
        console.warn('La tecnología ya existe');
        return;
      }
    
      const newTechnology: Tecnologias = {
        id: 0,
        name: this.nameTechnology,
        estatus: 1,
        fechaCreacion: new Date(),
        fechaModificacion: null,
        fechaBaja: null
      };

      this.sqliteManager.addTechnology(newTechnology)
      .then((changes) => {
        console.log('Tecnología añadida:', changes);
        this.nameTechnology = '';

        this.technologyAdded.emit();
      })
      .catch((err) => {
        console.error('Error al añadir tecnología:', err);
      });
    
    });

  }

}
