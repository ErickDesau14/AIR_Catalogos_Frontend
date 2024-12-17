import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Notificaciones } from '../models/notifications';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = `${environment.notificacionUrl}/notificacion`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getNotificacionById(id: number): Observable<Notificaciones> {
    return this.httpClient.get<Notificaciones>(`${environment.notificacionUrl}/notificacion/${id}`);
  }

  getNotificacionService() {
    return this.httpClient.get<Notificaciones[]>(this.baseUrl);
  }

  getNotificacion(): Observable<Notificaciones[]> {
    return this.httpClient.get<Notificaciones[]>(this.baseUrl);
  }

  createNotificacion(notificacion: Notificaciones): Observable<Notificaciones> {
    return this.httpClient.post<Notificaciones>(this.baseUrl, notificacion);
  }

  updateEstatus(id: number, estatus: number): Observable<Notificaciones> {
    return this.httpClient.put<Notificaciones>(`${environment.notificacionUrl}/notificacion/${id}/estatus/${estatus}`, {});
  }

  updateNotificacion(id: number, notificacion: Notificaciones): Observable<Notificaciones> {
    return this.httpClient.put<Notificaciones>(`${environment.notificacionUrl}/notificacion/${id}`, notificacion);
  }

}
