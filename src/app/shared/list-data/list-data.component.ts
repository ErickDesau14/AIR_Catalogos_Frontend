import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Tecnologias } from 'src/app/models/tecnologias';
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
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private tecnologiaService: TecnologiaService
  ) {

  }

  private normalizeTechnologyName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  private validateTechnologyName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      this.alertService.alertWarning('El nombre de la tecnología no puede estar vacío');
      return false;
    }

    const normalizedName = this.normalizeTechnologyName(name);
    const exists = this.data.some((tech: Tecnologias) =>
      this.normalizeTechnologyName(tech.nombre).toLowerCase() === normalizedName.toLowerCase()
    );

    if (exists) {
      this.alertService.alertWarning('Ya existe esta tecnología');
      return false;
    }

    return true;
  }

  get isNameTechnologyValid(): boolean {
    return this.selectedNameTechnology && this.selectedNameTechnology.trim().length > 0;
  }

  emitUpdateTechnology() {
    const normalizedName = this.normalizeTechnologyName(this.selectedNameTechnology);

    if (!this.validateTechnologyName(normalizedName)) {
      return;
    }

    this.updateTechnology.emit(normalizedName);
  }

  addData() {

    const normalizedName = this.normalizeTechnologyName(this.selectedNameTechnology);

    if (!this.validateTechnologyName(normalizedName)) {
      return;
    }

    const newTechnology: Tecnologias = {
      nombre: normalizedName,
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Está seguro de que desea agregar esta tecnología?',
      () => {
        this.tecnologiaService.createTecnologia(newTechnology).subscribe({
          next: () => {
            this.alertService.alertSuccess('Tecnología creada exitosamente');
            this.resetFormFields();
            this.technologyAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al crear la tecnología');
            }
          }
        });
      }
    );

  }

  resetFormFields() {
    this.selectedNameTechnology = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
