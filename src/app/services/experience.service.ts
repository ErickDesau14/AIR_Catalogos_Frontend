import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Experiencia } from "../models/experiencie";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private baseUrl = `${environment.experienciaUrl}/experiencia`;

  constructor(
    private httpClient: HttpClient
  ) {}

  getPuestoById(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(`${environment.experienciaUrl}/puestos/${id}`);
  }

  getTPuestosService() {
    return this.httpClient.get<Experiencia[]>(this.baseUrl);
  }

  getPuestos(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(this.baseUrl);
  }

  createPuesto(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.post<Experiencia>(this.baseUrl, experiencia);
  }

  updateEstatus(id: number, estatus: number): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${environment.puestoUrl}/experiencia/${id}/estatus/${estatus}`, {});
  }

  updatePuesto(id: number, experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${environment.puestoUrl}/experiencia/${id}`, experiencia);
  }

}
