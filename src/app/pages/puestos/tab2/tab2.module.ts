import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListDataPositionComponent } from 'src/app/shared/list-data-position/list-data-position.component';
import { ListPositionsComponent } from './components/list-positions/list-positions.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    TranslateModule.forChild(),
    ListDataPositionComponent,
  ],
  declarations: [Tab2Page, ListPositionsComponent]
})
export class Tab2PageModule {}
