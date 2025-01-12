import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ListTechnologiesComponent } from './components/list-technologies/list-technologies.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListDataComponent } from "../../../shared/list-data/list-data.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    TranslateModule.forChild(),
    ListDataComponent
],
  declarations: [
    Tab1Page,
    ListTechnologiesComponent
  ]
})
export class Tab1PageModule {}
