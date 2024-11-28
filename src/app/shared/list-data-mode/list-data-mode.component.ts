import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';

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

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService
  ) { }

  get isNameModeValid(): boolean {
    return this.nameMode && this.nameMode.trim().length > 0;
  }

  addData() {
    if (!this.nameMode) {
      console.warn('El nombre de la modalidad está vacía');
      return;
    }

    const normalizedMode = this.nameMode.replace(/\s+/g, '').toLowerCase();

  }

}
