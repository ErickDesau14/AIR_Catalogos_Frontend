import { Component, OnInit } from '@angular/core';
import { Puestos } from 'src/app/models/positions';

@Component({
  selector: 'app-list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss'],
})
export class ListPositionsComponent  implements OnInit {

  public puestos: Puestos[];
  public showForm: boolean;

  public selectedNamePosition: string = '';
  public selectedCreationDate: string = '';
  public selectedModificationDate: string = '';
  public selectedDeactivationDate: string = '';

  public isEditing: boolean = false;

  public lastSelectedId: number | null = null;

  constructor() {
    this.showForm = false;
    this.puestos = [];
  }

  ngOnInit() {
    this.getPositions();
  }

  getPositions() {

  }

  selectPosition(item: Puestos) {

    if (this.lastSelectedId === item.id) {
      this.resetForm();
      this.lastSelectedId = null;
    } else {

      this.selectedNamePosition = item.name || '';
      this.selectedCreationDate = item.fechaCreacion ? item.fechaCreacion.toLocaleDateString('en-CA') : '';
      this.selectedModificationDate = item.fechaModificacion ? item.fechaModificacion.toLocaleDateString('en-CA') : '';
      this.selectedDeactivationDate = item.fechaBaja ? item.fechaBaja.toLocaleDateString('en-CA') : '';

      this.isEditing = true;
      this.lastSelectedId = item.id;

    }

    console.log("Selected Position Details:", {
      name: this.selectedNamePosition,
      creationDate: this.selectedCreationDate,
      modificationDate: this.selectedModificationDate,
      deactivationDate: this.selectedDeactivationDate
    });
  }

  updatePosition() {
    this.resetForm();
  }

  resetForm() {
    this.selectedNamePosition = '';
    this.selectedCreationDate = '';
    this.selectedModificationDate = '';
    this.selectedDeactivationDate = '';
    this.isEditing = false;
  }

  onShowForm() {
    this.showForm = true;
  }

  desactivatePosition(idPuesto: number) {

  }

}
