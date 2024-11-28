import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

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

  @Input() yearExperience: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;

  @Output() experienceAdded: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor() { }

  get isYearExperienceValid(): boolean {
    return this.yearExperience && this.yearExperience.trim().length > 0;
  }

  addData() {
    if (!this.yearExperience) {
      console.warn('El año de experiencia está vacío');
      return;
    }

    const normalizedTechnologyName = this.yearExperience.replace(/\s+/g, '').toLowerCase();

  }

}
