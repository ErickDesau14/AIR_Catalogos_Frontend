import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Puestos } from '../models/positions';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private baseUrl = `${environment.puestoUrl}/puestos`;

  constructor(
    private httpClient: HttpClient
  ) {}

  getPuestoById(id: number): Observable<Puestos> {
    return this.httpClient.get<Puestos>(`${environment.puestoUrl}/puestos/${id}`);
  }

  getTPuestosService() {
    return this.httpClient.get<Puestos[]>(this.baseUrl);
  }

  getPuestos(): Observable<Puestos[]> {
    return this.httpClient.get<Puestos[]>(this.baseUrl);
  }

  createPuesto(puesto: Puestos): Observable<Puestos> {
    return this.httpClient.post<Puestos>(this.baseUrl, puesto);
  }

  updateEstatus(id: number, estatus: number): Observable<Puestos> {
    return this.httpClient.put<Puestos>(`${environment.puestoUrl}/puestos/${id}/estatus/${estatus}`, {});
  }

  updatePuesto(id: number, puesto: Puestos): Observable<Puestos> {
    return this.httpClient.put<Puestos>(`${environment.puestoUrl}/puestos/${id}`, puesto);
  }

}
