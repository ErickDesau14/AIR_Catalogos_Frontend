import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
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
  @Input() isEditing: boolean = false;

  @Input() nameTechnology: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedNameTechnology: string = '';

  @Output() technologyAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateTechnology = new EventEmitter<string>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private sqliteManager: SqliteManagerService
  ) {

  }

  get isNameTechnologyValid(): boolean {
    return this.selectedNameTechnology && this.selectedNameTechnology.trim().length > 0;
  }

  emitUpdateTechnology() {
    this.updateTechnology.emit(this.selectedNameTechnology);
  }

  addData() {
    if (!this.selectedNameTechnology) {
      console.warn('El nombre de la tecnología está vacío');
      return;
    }

    const normalizedTechnologyName = this.selectedNameTechnology.replace(/\s+/g, '').toLowerCase();

    this.sqliteManager.technologyExists(normalizedTechnologyName)
    .then((exists) => {
      if (exists) {
        console.warn('La tecnología ya existe');
        return;
      }

      const newTechnology: Tecnologias = {
        id: 0,
        name: this.selectedNameTechnology,
        estatus: 1,
        fechaCreacion: new Date(),
        fechaModificacion: null,
        fechaBaja: null
      };

      this.sqliteManager.addTechnology(newTechnology)
      .then((changes) => {
        console.log('Tecnología añadida:', changes);
        this.selectedNameTechnology = '';

        this.technologyAdded.emit();
      })
      .catch((err) => {
        console.error('Error al añadir tecnología:', err);
      });

    });

  }

}
