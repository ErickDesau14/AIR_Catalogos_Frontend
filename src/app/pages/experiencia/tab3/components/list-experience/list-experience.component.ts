import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Experiencia } from 'src/app/models/experiencie';
import { AlertService } from 'src/app/services/alert.service';
import { ExperienciaService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.scss'],
})
export class ListExperienceComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public experience: Experiencia[];
  public showForm: boolean;
  public selectedYearExperience: number;
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private experienciaService: ExperienciaService
  ) {
    this.showForm = false;
    this.experience = [];
  }

  ngOnInit() {
    this.getExperiences();
  }

  getExperiences() {
    this.experienciaService.getExperiencia().subscribe({
      next: (data) => {
        this.experience = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener las experiencias ' + error.message);
      }
    })
  }

  selectExperience(item: Experiencia, editMode: boolean = false) {

    if (this.lastSelectedId === item.idExperiencia) {
      this.resetForm();
      return;
    }

    this.experienciaService.getExperienceById(item.idExperiencia).subscribe({
      next: (experiencia) => {
        this.selectedYearExperience = experiencia.anho;
        this.selectedCreationDate = experiencia.fechaCreacion ? new Date(experiencia.fechaCreacion).toISOString().split('T')[0] : '';
        this.selectedModificationDate = experiencia.fechaModificacion ? new Date(experiencia.fechaModificacion).toISOString().split('T')[0] : '';
        this.selectedDeactivationDate = experiencia.fechaBaja ? new Date(experiencia.fechaBaja).toISOString().split('T')[0] : '';

        this.isEditing = editMode;
        this.isReadOnly = !editMode;
        this.lastSelectedId = item.idExperiencia;
        this.content.scrollToTop(500);
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener la experiencia ' + error.message);
      }
    });
  }

  async updateExperience(updatedAnho: number) {

    if (this.lastSelectedId !== null) {
      const updatedExperience: Experiencia = {
        anho: updatedAnho,
        estatus: 1
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar el año de experiencia?',
        () => {
          this.experienciaService.updateExperience(this.lastSelectedId, updatedExperience).subscribe({
            next: () => {
              this.alertService.alertSuccess('Año de experiencia actualizado correctamente');
              this.getExperiences();
              this.resetForm();
            },
            error: async (error) => {
              await this.alertService.alertError('Error al actualizar el año de experiencia ' + error.message);
            }
          });
        }
      );
    }

  }

  desactivateExperience(item: Experiencia) {

    const newEstatus = item.estatus === 1 ? 0 : 1;
    const mensaje = newEstatus === 1
      ? '¿Estás seguro de que deseas activar el año de experiencia?'
      : '¿Estás seguro de que deseas desactivar el año de experiencia?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.experienciaService.updateEstatus(item.idExperiencia, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getExperiences();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar el año de experiencia ' + error.message);
          }
        });
      }
    );

  }

  resetForm() {
    this.selectedYearExperience = null;
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    this.isEditing = false;
    this.isReadOnly = false;
    this.lastSelectedId = null;
  }

  onShowForm() {
    this.showForm = true;
  }

}
