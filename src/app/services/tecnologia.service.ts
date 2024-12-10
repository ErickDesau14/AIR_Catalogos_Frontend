import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tecnologias } from '../models/tecnologias';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  private baseUrl = `${environment.tecnologiaUrl}/tecnologias`;

  constructor(
    private httpClient : HttpClient,
  ) { }

  getTecnologiaById(id: number): Observable<Tecnologias> {
    return this.httpClient.get<Tecnologias>(`${environment.tecnologiaUrl}/tecnologias/${id}`);
  }

  getTecnologiasService() {
    return this.httpClient.get<Tecnologias[]>(this.baseUrl);
  }

  getTecnologias(): Observable<Tecnologias[]> {
    return this.httpClient.get<Tecnologias[]>(this.baseUrl);
  }

  createTecnologia(tecnologia: Tecnologias): Observable<Tecnologias> {
    return this.httpClient.post<Tecnologias>(this.baseUrl, tecnologia);
  }

  updateEstatus(id: number, estatus: number): Observable<Tecnologias> {
    return this.httpClient.put<Tecnologias>(`${environment.tecnologiaUrl}/tecnologias/${id}/estatus/${estatus}`, {});
  }

  updateTecnologia(id: number, tecnologia: Tecnologias): Observable<Tecnologias> {
    return this.httpClient.put<Tecnologias>(`${environment.tecnologiaUrl}/tecnologias/${id}`, tecnologia);
  }

}
