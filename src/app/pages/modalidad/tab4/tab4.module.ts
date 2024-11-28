import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { TranslateModule } from '@ngx-translate/core';
import { ListDataModeComponent } from 'src/app/shared/list-data-mode/list-data-mode.component';
import { ListModeComponent } from './components/list-mode/list-mode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    TranslateModule.forChild(),
    ListDataModeComponent
  ],
  declarations: [Tab4Page, ListModeComponent]
})
export class Tab4PageModule {}
