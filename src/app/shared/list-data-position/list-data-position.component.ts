import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';

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

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService
  ) { }

  get isNamePositionValid(): boolean {
    return this.namePosition && this.namePosition.trim().length > 0;
  }

  addData() {

    if (!this.selectedNamePosition) {
      this.alertService.alertError(
        'El nombre del puesto no puede estar vacío',
      );
      return;
    }

    // const normalizedPositionName = this.namePosition.replace(/\s+/g, '').toLowerCase();

    // this.sqliteManager.technologyExists(normalizedPositionName)
    // .then((exists) => {
    //   if (exists) {
    //     this.alertService.alertWarning('Este puesto ya existe');
    //     return;
    //   }
    // });

  }

}
