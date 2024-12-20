import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Modalidad } from 'src/app/models/mode';
import { AlertService } from 'src/app/services/alert.service';
import { ModalidadService } from 'src/app/services/modalidad.service';

@Component({
  selector: 'app-list-data-mode',
  templateUrl: './list-data-mode.component.html',
  styleUrls: ['./list-data-mode.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule]
})
export class ListDataModeComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;
  @Input() isEditing: boolean = false;
  @Input() nameMode: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedNameMode: string = '';

  @Output() ModeAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateMode = new EventEmitter<string>();
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private modalidadService: ModalidadService
  ) { }

  private normalizeModeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  get isNameModeValid(): boolean {
    return this.selectedNameMode && this.selectedNameMode.trim().length > 0;
  }

  private validateModeName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      this.alertService.alertWarning('El nombre de la modalidad no puede estar vacío');
      return false;
    }

    const normalizedName = this.normalizeModeName(name);
    const exists = this.data.some((mode: Modalidad) =>
      this.normalizeModeName(mode.modalidad).toLowerCase() === normalizedName.toLowerCase()
    );

    if (exists) {
      this.alertService.alertWarning('Ya existe esta modalidad');
      return false;
    }

    return true;
  }

  emitUpdateMode() {
    const normalizedName = this.normalizeModeName(this.selectedNameMode);

    if (!this.validateModeName(normalizedName)) {
      return;
    }

    this.updateMode.emit(normalizedName);
  }

  addData() {
    const normalizedName = this.normalizeModeName(this.selectedNameMode);

    if (!this.validateModeName(normalizedName)) {
      return;
    }

    const newMode: Modalidad = {
      modalidad: normalizedName,
      estatus: true
    };

    this.alertService.alertConfirm(
      '¿Estás seguro de agregar esta modalidad?',
      () => {
        this.modalidadService.createModalidad(newMode).subscribe({
          next: () => {
            this.alertService.alertSuccess('Modalidad agregada correctamente');
            this.resetFormFields();
            this.ModeAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al agregar la modalidad');
            }
          }
        });
      }
    );
  }

  resetFormFields() {
    this.selectedNameMode = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
