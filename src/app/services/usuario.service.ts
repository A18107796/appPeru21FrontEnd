import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CommonService<Usuario>{
  baseEndPoint = url_spring + 'usuarios';
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  cambiarEstado(id: number, estado: boolean): Observable<any> {
    return this.httpClient.put<any>(`${this.baseEndPoint}/status/${id}/${estado}`, null);
  }

  saveChanges(id: number, roles: Rol[]): Observable<any> {
    return this.httpClient.put<any>(`${this.baseEndPoint}/${id}/save-changes`, roles);
  }

  getRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${this.baseEndPoint}/roles`);
  }

}
