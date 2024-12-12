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

  @Input() yearExperience: number = 0;
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedYearExperience: number = 0;

  @Output() experienceAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateYearExperience = new EventEmitter<number>();
  @Output() resetForm = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService,
    private experienciaService: ExperienciaService
  ) { }

  private validateExperienceYear(year: number): boolean {
    if (!year || year <= 0) {
      this.alertService.alertWarning('El año de experiencia no puede ser menor o igual a 0');
      return false;
    }

    const exists = this.data.some((exp: Experiencia) => exp.anho === year);

    if (exists) {
      this.alertService.alertWarning('Este año de experiencia ya existe');
      return false;
    }

    return true;
  }

  get isYearExperienceValid(): boolean {
    return this.selectedYearExperience > 0;
  }

  emmitUpdateYearExperience() {
    if (!this.validateExperienceYear(this.selectedYearExperience)) {
      return;
    }

    this.updateYearExperience.emit(this.selectedYearExperience);
  }

  addData() {

    if (!this.validateExperienceYear(this.selectedYearExperience)) {
      return;
    }

    const newExperience: Experiencia = {
      anho: this.selectedYearExperience,
      estatus: 1
    };

    this.alertService.alertConfirm(
      '¿Estás seguro de que deseas agregar el año de experiencia?',
      () => {
        this.experienciaService.createExperiencia(newExperience).subscribe({
          next: () => {
            this.alertService.alertSuccess('Año de experiencia agregado correctamente');
            this.resetFormFields();
            this.experienceAdded.emit();
          },
          error: async (err) => {
            if (err.error && err.error.message) {
              await this.alertService.alertWarning(err.error.message);
              this.resetFormFields();
            } else {
              await this.alertService.alertError('Error al agregar el año de experiencia ' + err.message);
            }
          }
        })
      }
    )

  }

  resetFormFields() {
    this.selectedYearExperience = 0;
    this.creationDate = '';
    this.modificationDate = '';
    this.deactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.resetForm.emit();
  }

}
