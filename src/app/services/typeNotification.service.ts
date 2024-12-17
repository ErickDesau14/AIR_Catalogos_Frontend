import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { TipoNotificaciones } from '../models/typeNotifications';

@Injectable({
  providedIn: 'root'
})
export class TipoNotificationService {

  private baseUrl = `${environment.tipoNotificacionUrl}/tipoNotificacion`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getTipoNotificacionById(id: number): Observable<TipoNotificaciones> {
    return this.httpClient.get<TipoNotificaciones>(`${environment.tipoNotificacionUrl}/tipoNotificacion/${id}`);
  }

  getTipoNotificacionService() {
    return this.httpClient.get<TipoNotificaciones[]>(this.baseUrl);
  }

  getTipoNotificacion(): Observable<TipoNotificaciones[]> {
    return this.httpClient.get<TipoNotificaciones[]>(this.baseUrl);
  }

  createTipoNotificacion(tipoNotificacion: TipoNotificaciones): Observable<TipoNotificaciones> {
    return this.httpClient.post<TipoNotificaciones>(this.baseUrl, tipoNotificacion);
  }

  updateEstatus(id: number, estatus: number): Observable<TipoNotificaciones> {
    return this.httpClient.put<TipoNotificaciones>(`${environment.tipoNotificacionUrl}/tipoNotificacion/${id}/estatus/${estatus}`, {});
  }

  updateTipoNotificacion(id: number, tipoNotificacion: TipoNotificaciones): Observable<TipoNotificaciones> {
    return this.httpClient.put<TipoNotificaciones>(`${environment.tipoNotificacionUrl}/tipoNotificacion/${id}`, tipoNotificacion);
  }

}
