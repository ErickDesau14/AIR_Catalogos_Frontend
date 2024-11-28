import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';

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

  @Input() yearExperience: string = '';
  @Input() creationDate: string = '';
  @Input() modificationDate: string = '';
  @Input() deactivationDate: string = '';
  @Input() isReadOnly: boolean = true;
  @Input() selectedYearExperience: string = '';

  @Output() experienceAdded: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateYearExperience = new EventEmitter<string>();

  @ContentChild('templateData', { static: false})
  templateData: TemplateRef<any>;

  constructor(
    private alertService: AlertService
  ) { }

  get isYearExperienceValid(): boolean {
    return this.yearExperience && this.yearExperience.trim().length > 0;
  }

  addData() {

    if (!this.yearExperience) {
      this.alertService.alertError(
        'El año de experiencia no puede estar vacío',
      );
      return;
    }

    // const normalizedYearExperience = this.yearExperience.replace(/\s+/g, '').toLowerCase();

        // this.sqliteManager.yearExperienceExists(normalizedYearExperience)
    // .then((exists) => {
    //   if (exists) {
    //     this.alertService.alertWarning('Este año de expriencia ya existe');
    //     return;
    //   }
    // });

  }

}
