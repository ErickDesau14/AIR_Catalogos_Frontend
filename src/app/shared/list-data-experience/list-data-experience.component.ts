import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Experiencia } from 'src/app/models/experiencie';
import { AlertService } from 'src/app/services/alert.service';
import { ExperienciaService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-list-data-experience',
  templateUrl: './list-data-experience.component.html',
  styleUrls: ['./list-data-experience.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, TranslateModule, FormsModule]
})
export class ListDataExperienceComponent {

  @Input({required: true}) data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd: boolean = true;
  @Input() isEditing: boolean = false;
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedExperience: string = '';

  @Output() experienceAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateYearExperience = new EventEmitter<string>();
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private experienciaService: ExperienciaService
  ) { }

  private normalizedExperienceName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  private validateExperience(experiencia: string): boolean {
    if (!experiencia || experiencia.trim().length === 0) {
      this.alertService.alertWarning('La experienciea no puede estar vacío');
      return false;
    }

    const normalizedExperience = this.normalizedExperienceName(experiencia);
    const exists = this.data.some((exp: Experiencia) =>
      this.normalizedExperienceName(exp.experiencia).toLowerCase() === normalizedExperience.toLowerCase());

    if (exists) {
      this.alertService.alertWarning('Esta experiencia ya existe');
      return false;
    }

    return true;
  }

  get isYearExperienceValid(): boolean {
    return this.selectedExperience && this.selectedExperience.trim().length > 0;
  }

  emmitUpdateYearExperience() {
    const normalizedExperience = this.normalizedExperienceName(this.selectedExperience);

    if (!this.validateExperience(normalizedExperience)) {
      return;
    }

    this.updateYearExperience.emit(normalizedExperience);
  }

  addData() {

    const normalizedExperience = this.normalizedExperienceName(this.selectedExperience);

        if (!this.validateExperience(normalizedExperience)) {
          return;
        }

        const newTechnology: Experiencia = {
          experiencia: normalizedExperience,
          estatus: true
        };

        this.alertService.alertConfirm(
          '¿Está seguro de que desea agregar esta tecnología?',
          () => {
            this.experienciaService.createExperiencia(newTechnology).subscribe({
              next: () => {
                this.alertService.alertSuccess('Experiencia creada exitosamente');
                this.resetFormFields();
                this.experienceAdded.emit();
              },
              error: async (err) => {
                if (err.error && err.error.message) {
                  await this.alertService.alertWarning(err.error.message);
                  this.resetFormFields();
                } else {
                  await this.alertService.alertError('Error al crear esta experiencia');
                }
              }
            });
          }
        );

  }

  resetFormFields() {
    this.selectedExperience = '';
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
