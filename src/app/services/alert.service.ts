import { Injectable } from '@angular/core';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) { }

  async alertMessage(
    header: string,
    message: string,
    _cssClass: string
  ) {
    const alert = await this.alertController.create({
      header, message, cssClass: "alertMessagge", buttons: ['OK']
    })
    await alert.present();
  }

  async alertOnOff(newStatus: number) {
    const isDeactivated = newStatus === 0;
    const message = `
      <section class = "ion-padding-bottom">
        <img src="/assets/icons/${isDeactivated ? 'off_icon' : 'on_icon'}.png" alt="${isDeactivated ? 'Desactivado' : 'Activado'}" />
      </section>
      Tecnología ${isDeactivated ? 'desactivada' : 'activada'} con éxito
    `;
    const alert = await this.alertController.create({
      message,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });

    await alert.present();
  }


  async alertConfirm(text: string, functionOk) {
    let message = `
      <section>
        <img src="/assets/icons/alert_icon.png" alt="alert">
      </section>
      ${text}
    `;
    const alert = await this.alertController.create({
      message,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'Confirmar',
          handler: () => {
            functionOk();
          }
        }
      ]
    });

    await alert.present();
  }

  async alertSuccess(text: string) {

    let message = `
      <section>
        <img src="/assets/icons/success_icon.png" alt="Success">
      </section>
      ${text}`;
    const alertPresent = await this.alertController.create({
      message,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    await alertPresent.present();
  }

  async alertWarning(text:string) {
    let message = `
    <section>
      <img src="/assets/icons/alert_icon.png" alt="alert">
    </section>
    ${text}`;
    const alertPresent = await this.alertController.create({
      message,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    await alertPresent.present();
  }

  async alertError(text: string) {
    let message =
    ` <section>
    <img src="/assets/icons/error_icon.png" alt="alert">
    </section>
    ${text} `;
    const alertPresent = await this.alertController.create({
      message,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    await alertPresent.present();
  }

}
