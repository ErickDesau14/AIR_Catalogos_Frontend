import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { TranslateModule } from '@ngx-translate/core';
import { ListNotificationsComponent } from './components/list-notifications/list-notifications.component';
import { ListDataNotificationsComponent } from 'src/app/shared/list-data-notifications/list-data-notifications.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    TranslateModule.forChild(),
    ListDataNotificationsComponent
  ],
  declarations: [
    Tab5Page,
    ListNotificationsComponent
  ]
})
export class Tab5PageModule {}
