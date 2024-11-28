import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ListExperienceComponent } from './components/list-experience/list-experience.component';
import { ListDataExperienceComponent } from 'src/app/shared/list-data-experience/list-data-experience.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    TranslateModule.forChild(),
    ListDataExperienceComponent
  ],
  declarations: [Tab3Page, ListExperienceComponent]
})
export class Tab3PageModule {}
