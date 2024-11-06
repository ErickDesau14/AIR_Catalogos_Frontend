import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues, JsonSQLite } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Tecnologias } from '../models/tecnologias';

@Injectable({
  providedIn: 'root'
})
export class SqliteManagerService {

  public dbReady: BehaviorSubject<boolean>;
  public isWeb: boolean;

  private dbName: string;

  private DB_SETUP_KEY = 'first_db_setup'
  private DB_NAME_KEY = 'db_name';

  constructor(
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.isWeb = false;
    this.dbName = '';
    this.dbReady = new BehaviorSubject(false);
  }

  async init() {

    const info = await Device.getInfo();
    const sqlite = CapacitorSQLite as any;

    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Sin acceso a la base de datos',
          message: 'Esta app no puede funcionar sin acceso a la base de datos',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    }

    this.setupDatabase();

  }

  async setupDatabase() {
    const dbSetupDone = await Preferences.get({ key: this.DB_SETUP_KEY })

    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      const dbName = await this.getDBName();
      await CapacitorSQLite.createConnection({ database: dbName });
      await CapacitorSQLite.open({ database: dbName });
      this.dbReady.next(true);
    }
  }

  downloadDatabase() {

    this.http.get('../../assets/db/db.json').subscribe( async (jsonExport: JsonSQLite) => {
      const jsonString = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring: jsonString });

      if (isValid.result) {
        this.dbName = jsonExport.database;
        await CapacitorSQLite.importFromJson({ jsonstring: jsonString });
        await CapacitorSQLite.createConnection({ database: this.dbName });
        await CapacitorSQLite.open({ database: this.dbName });

        await Preferences.set({ key: this.DB_SETUP_KEY, value: '1' });
        await Preferences.set({ key: this.DB_NAME_KEY, value: this.dbName });

        this.dbReady.next(true);
      }
    })

  }

  async getDBName() {

    if (!this.dbName) {
      const dbName = await Preferences.get({ key: this.DB_NAME_KEY });
      this.dbName = dbName.value;
    }
    return this.dbName;
  }

  async getTechnologies() {
    let sql = 'SELECT * FROM CAT_Tecnologias';

    const dbName = await this.getDBName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql
    }).then( (response: capSQLiteValues) => {
      let technologies: Tecnologias[] = [];
      for (let index = 0; index < response.values.length; index++) {
        const row = response.values[index];
        let technologie = row as Tecnologias;
        technologies.push(technologie);
      }
      return Promise.resolve(technologies);
    }).catch(error => Promise.reject(error));

  }

  async addTechnology(technology: Tecnologias) {
    const dbName = await this.getDBName();
    const currentDate = new Date().toISOString().split('T')[0];
    let sql = 'INSERT INTO CAT_Tecnologias (tecnologia, fechaCreacion, estatus) VALUES (?, ?, 1)';
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [{
        statement: sql,
        values: [
          technology.name,
          currentDate
        ]
      }]
    }).then( (changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch( err => Promise.reject(err));
  }

  async technologyExists(name: string): Promise<boolean> {
    const dbName = await this.getDBName();
    const sql = 'SELECT COUNT(*) as count FROM CAT_Tecnologias WHERE LOWER(tecnologia) =  LOWER(?)';
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [name]
    }).then((response) => {
      const count = response.values[0].count;
      return count > 0;
    }).catch((error) => {
      console.error('Error al verificar si la tecnología existe:', error);
      return false;
    });
  }

  async desactivateTechnology(idTecnologia: number): Promise<void> {
    const dbName = await this.getDBName();

    const getStatusSql = 'SELECT estatus FROM CAT_Tecnologias WHERE idTecnologia = ?';
    const currentStatus = await CapacitorSQLite.query({
      database: dbName,
      statement: getStatusSql,
      values: [idTecnologia]
    }).then((response) => {
      return response.values[0].estatus;
    }).catch((error) => {
      console.error('Error al obtener el estatus de la tecnología:', error);
      return null;
    })

    if (currentStatus == null) {
      return Promise.reject('No se pudo obtener el estatus de la tecnología');
    }

    const newStatus = currentStatus === 1 ? 0 : 1;

    const updateStatusSql = 'UPDATE CAT_Tecnologias SET estatus = ? WHERE idTecnologia = ?';
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [{
        statement: updateStatusSql,
        values: [newStatus, idTecnologia]
      }]
    }).then(() => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
    }).catch(err => Promise.reject(err));
  }

}
