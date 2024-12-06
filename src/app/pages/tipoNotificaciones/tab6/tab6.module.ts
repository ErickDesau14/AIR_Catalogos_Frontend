import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab6PageRoutingModule } from './tab6-routing.module';

import { Tab6Page } from './tab6.page';
import { TranslateModule } from '@ngx-translate/core';
import { ListDataTypeNotificationsComponent } from 'src/app/shared/list-data-type-notifications/list-data-type-notifications.component';
import { ListTypeNotificationsComponent } from './components/list-type-notifications/list-type-notifications.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab6PageRoutingModule,
    TranslateModule.forChild(),
    ListDataTypeNotificationsComponent
  ],
  declarations: [
    Tab6Page,
    ListTypeNotificationsComponent
  ]
})
export class Tab6PageModule {}
