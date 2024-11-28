import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTechnologiesComponent } from '../../tecnologias/tab1/components/list-technologies/list-technologies.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  @ViewChild(ListTechnologiesComponent) listTechnologiesComponent!: ListTechnologiesComponent;

  constructor() { }

  handleRefresh(event: any) {

    if (this.listTechnologiesComponent) {
      this.listTechnologiesComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
