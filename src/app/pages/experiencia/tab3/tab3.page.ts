import { Component, ViewChild } from '@angular/core';
import { ListTechnologiesComponent } from '../../tecnologias/tab1/components/list-technologies/list-technologies.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(ListTechnologiesComponent) listTechnologiesComponent!: ListTechnologiesComponent;

  constructor() {}

  handleRefresh(event: any) {

    if (this.listTechnologiesComponent) {
      this.listTechnologiesComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
