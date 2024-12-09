import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tecnologias } from '../models/tecnologias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  getTecnologiasService() {
    return this.httpClient.get<Tecnologias[]>(`${environment.tecnologiaUrl}/tecnologias`);
  }

}
