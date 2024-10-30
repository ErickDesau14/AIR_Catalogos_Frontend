import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isWeb: boolean;

  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.initApp();
  }

  initApp() {
    this.platform.ready().then( async () => {
      const language = Device.getLanguageCode();
      const info = await Device.getInfo();

      this.isWeb = info.platform == 'web';

      if ((await language).value) {
        this.translate.use((await language).value.slice(0, 2));
      }
    })
  }

}
