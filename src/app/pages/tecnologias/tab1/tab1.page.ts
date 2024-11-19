import { Component, ViewChild } from '@angular/core';
import { ListTechnologiesComponent } from './components/list-technologies/list-technologies.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
