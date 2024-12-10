import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Tecnologias } from 'src/app/models/tecnologias';
import { AlertService } from 'src/app/services/alert.service';
import { TecnologiaService } from 'src/app/services/tecnologia.service';

@Component({
  selector: 'app-list-technologies',
  templateUrl: './list-technologies.component.html',
  styleUrls: ['./list-technologies.component.scss'],
})
export class ListTechnologiesComponent  implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public technologies: Tecnologias[];
  public showForm: boolean;
  public selectedNameTechnology: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';
  public isEditing: boolean = false;
  public isReadOnly: boolean = false;
  public lastSelectedId: number | null = null;

  constructor(
    private alertService: AlertService,
    private tecnologiaService: TecnologiaService
  ) {
    this.showForm = false;
    this.technologies = [];
  }

  ngOnInit() {
    this.getTechnologies();
  }

  getTechnologies() {
    this.tecnologiaService.getTecnologias().subscribe({
      next: (data) => {
        this.technologies = data;
      },
      error: async (error) => {
        await this.alertService.alertError('Error al obtener las tecnologías ' + error.message);
      }
    })
  }

  selectTechnology(item: Tecnologias, editMode: boolean = false) {

    if (this.lastSelectedId === item.idTecnologia) {
      this.resetForm();
      return;
    }

      this.tecnologiaService.getTecnologiaById(item.idTecnologia).subscribe({
        next: (tecnologia) => {
          this.selectedNameTechnology = tecnologia.nombre;
          this.selectedCreationDate = tecnologia.fechaCreacion ? new Date(tecnologia.fechaCreacion).toISOString().split('T')[0] : '';
          this.selectedModificationDate = tecnologia.fechaModificacion ? new Date(tecnologia.fechaModificacion).toISOString().split('T')[0] : '';
          this.selectedDeactivationDate = tecnologia.fechaBaja ? new Date(tecnologia.fechaBaja).toISOString().split('T')[0] : '';

          this.isEditing = editMode;
          this.isReadOnly = !editMode;
          this.lastSelectedId = item.idTecnologia;
          this.content.scrollToTop(500);
        },
        error: async (error) => {
          await this.alertService.alertError('Error al obtener la tecnología ' + error.message);
        }
      });
  }

  desactivateTecnologia(item: Tecnologias) {
    const newEstatus = item.estatus === 1 ? 0 : 1;
    const mensaje = newEstatus === 1
      ? '¿Estás seguro de que deseas activar la tecnología?'
      : '¿Estás seguro de que deseas desactivar la tecnología?';

    this.alertService.alertConfirm(
      mensaje,
      () => {
        this.tecnologiaService.updateEstatus(item.idTecnologia, newEstatus).subscribe({
          next: () => {
            this.alertService.alertOnOff(newEstatus);
            this.getTechnologies();
            this.resetForm();
          },
          error: async (error) => {
            await this.alertService.alertError('Error al actualizar la tecnología ' + error.message);
          }
        })
      }
    );
  }

  async updateTechnology(updatedName: string) {

    if (this.lastSelectedId !== null) {
      const updatedTechnology: Tecnologias = {
        nombre: updatedName.trim(),
        estatus: 1,
      };

      this.alertService.alertConfirm(
        '¿Estás seguro de que deseas actualizar la tecnología?',
        () => {
          this.tecnologiaService.updateTecnologia(this.lastSelectedId, updatedTechnology).subscribe({
            next: () => {
              this.alertService.alertSuccess('Tecnología actualizada exitosamente');
              this.getTechnologies();
              this.resetForm();
            },
            error: async (err) => {
              await this.alertService.alertError('Error al actualizar la tecnología ' + err.message);
            }
          })
        }
      );
    }
  }

  resetForm() {
    this.selectedNameTechnology = '';
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
