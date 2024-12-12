import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Puestos } from '../models/positions';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Modalidad } from "../models/mode";

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private baseUrl = `${environment.modalidadUrl}/modalidades`;

  constructor(
    private httpClient: HttpClient
  ) {}

  getModalidadById(id: number): Observable<Modalidad> {
    return this.httpClient.get<Modalidad>(`${environment.modalidadUrl}/modalidades/${id}`);
  }

  getModalidadService() {
    return this.httpClient.get<Modalidad[]>(this.baseUrl);
  }

  getModalidad(): Observable<Modalidad[]> {
    return this.httpClient.get<Modalidad[]>(this.baseUrl);
  }

  createModalidad(modalidad: Modalidad): Observable<Modalidad> {
    return this.httpClient.post<Modalidad>(this.baseUrl, modalidad);
  }

  updateEstatus(id: number, estatus: number): Observable<Modalidad> {
    return this.httpClient.put<Modalidad>(`${environment.modalidadUrl}/modalidades/${id}/estatus/${estatus}`, {});
  }

  updateModalidad(id: number, modalidad: Modalidad): Observable<Modalidad> {
    return this.httpClient.put<Modalidad>(`${environment.modalidadUrl}/modalidades/${id}`, modalidad);
  }

}
