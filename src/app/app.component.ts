import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TecnologiaService } from './services/tecnologia.service';
import { PuestoService } from './services/puesto.service';
import { ExperienciaService } from './services/experience.service';
import { ModalidadService } from './services/modalidad.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isWeb: boolean;
  public load: boolean;
  public tecnologias: any[] = [];
  public puestos: any[] = [];
  public experiencias: any[] = [];
  public modalidad: any[] = [];
  public notificaciones: any[] = [];
  public error: string = '';

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private tecnologiaService: TecnologiaService,
    private puestoService: PuestoService,
    private experienciaService: ExperienciaService,
    private modalidadService: ModalidadService,
    private notificacionService: NotificationService
  ) {
    this.load = false;
    this.isWeb = false;
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

      this.testConnection();

    })
  }

  testConnection() {
    this.tecnologiaService.getTecnologiasService().subscribe({
      next: (data) => {
        console.log('Conexión exitosa. Tecnologías recibidas:', data);
        this.tecnologias = data;
      },
      error: (err) => {
        console.log('Error al obtener la conexión: ', err);
        this.error = 'Error de conexión: ' + err.message;
      }
    });

    this.puestoService.getTPuestosService().subscribe({
      next: (data) => {
        console.log('Conexión exitosa. Puestos recibidos:', data);
        this.puestos = data;
      },
      error: (err) => {
        console.log('Error al obtener la conexión: ', err);
        this.error = 'Error de conexión: ' + err.message;
      }
    });

    this.experienciaService.getExperienciaService().subscribe({
      next: (data) => {
        console.log('Conexión exitosa. Experiencias recibidas:', data);
        this.experiencias = data;
      },
      error: (err) => {
        console.log('Error al obtener la conexión: ', err);
        this.error = 'Error de conexión: ' + err.message;
      }
    });

    this.modalidadService.getModalidadService().subscribe({
      next: (data) => {
        console.log('Conexión exitosa. Modalidades recibidas:', data);
        this.modalidad = data;
      },
      error: (err) => {
        console.log('Error al obtener la conexión: ', err);
        this.error = 'Error de conexión: ' + err.message;
      }
    });

    this.notificacionService.getNotificacionService().subscribe({
      next: (data) => {
        console.log('Conexión exitosa. Notificaciones recibidas:', data);
        this.notificaciones = data;
      },
      error: (err) => {
        console.log('Error al obtener la conexión: ', err);
        this.error = 'Error de conexión: ' + err.message;
      }
    });
  }

}
