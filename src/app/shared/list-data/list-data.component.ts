import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { TecnologiaService } from 'src/app/services/tecnologia.service';

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
    private alertService: AlertService,
    private tecnologiaService: TecnologiaService
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
      this.alertService.alertError(
        'El nombre de la tecnología no puede estar vacío',
      );
      return;
    }

    const newTechnology = {
      nombre: this.selectedNameTechnology.trim(),
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Está seguro de que desea agregar esta tecnología?',
      () => {
        this.tecnologiaService.createTecnologia(newTechnology).subscribe({
          next: () => {
            this.alertService.alertSuccess('Tecnología creada exitosamente');
            this.selectedNameTechnology = '';
            this.technologyAdded.emit();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al crear la tecnología ' + error.message);
          }
        })
      }
    );

  }

}
