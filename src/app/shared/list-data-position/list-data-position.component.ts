import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Puestos } from 'src/app/models/positions';
import { AlertService } from 'src/app/services/alert.service';
import { PuestoService } from 'src/app/services/puesto.service';

@Component({
  selector: 'app-list-data-position',
  templateUrl: './list-data-position.component.html',
  styleUrls: ['./list-data-position.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule]
})
export class ListDataPositionComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;
  @Input() isEditing: boolean = false;

  @Input() namePosition: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedNamePosition: string = '';

  @Output() positionAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updatePosition = new EventEmitter<string>();
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private puestoService: PuestoService
  ) { }

  private normalizePositionName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  private validatePositionName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      this.alertService.alertWarning('El nombre del puesto no puede estar vacío');
      return false;
    }

    const normalizedName = this.normalizePositionName(name);
    const exists = this.data.some((pos: any) =>
      this.normalizePositionName(pos.nombre).toLowerCase() === normalizedName.toLowerCase()
    );

    if (exists) {
      this.alertService.alertWarning('Este puesto ya existe');
      return false;
    }

    return true;
  }

  get isNamePositionValid(): boolean {
    return this.selectedNamePosition && this.selectedNamePosition.trim().length > 0;
  }

  emmitUpdatePosition() {
    const normalizedName = this.normalizePositionName(this.selectedNamePosition);

    if (!this.validatePositionName(normalizedName)) {
      return;
    }

    this.updatePosition.emit(normalizedName);
  }

  addData() {

    const normalizedname = this.normalizePositionName(this.selectedNamePosition);

    if (!this.validatePositionName(normalizedname)) {
      return;
    }

    const newPosition: Puestos = {
      nombre: normalizedname,
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Está seguro de que desea agregar este puesto?',
      () => {
        this.puestoService.createPuesto(newPosition).subscribe({
          next: () => {
            this.alertService.alertSuccess('Puesto agregado exitosamente');
            this.resetFormFields();
            this.positionAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al agregar el puesto ' + err.message);
            }
          }
        });
      }
    );

  }

  resetFormFields() {
    this.selectedNamePosition = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
