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

  getExperienceById(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(`${environment.experienciaUrl}/experiencia/${id}`);
  }

  getExperienciaService() {
    return this.httpClient.get<Experiencia[]>(this.baseUrl);
  }

  getExperiencia(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(this.baseUrl);
  }

  createExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.post<Experiencia>(this.baseUrl, experiencia);
  }

  updateEstatus(id: number, estatus: number): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${environment.experienciaUrl}/experiencia/${id}/estatus/${estatus}`, {});
  }

  updateExperience(id: number, experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${environment.experienciaUrl}/experiencia/${id}`, experiencia);
  }

}
