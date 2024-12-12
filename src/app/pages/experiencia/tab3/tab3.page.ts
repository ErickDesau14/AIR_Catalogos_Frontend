import { Component, ViewChild } from '@angular/core';
import { ListExperienceComponent } from './components/list-experience/list-experience.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(ListExperienceComponent) listExperienceComponent!: ListExperienceComponent;

  constructor() {}

  handleRefresh(event: any) {

    if (this.listExperienceComponent) {
      this.listExperienceComponent.resetForm();
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);

  }

}
