import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Estado } from '../enums/estado';
import { Periodo } from '../models/periodo';
import { CommonServiceStatusService } from './common-service-status.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService extends CommonServiceStatusService<Periodo>{
  baseEndPoint = url_spring + 'periodos'

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  createYearAcademic(fechaInicio: Date, dias: number, duracion = 12): Observable<any> {
    return this.httpClient.post(`${this.baseEndPoint}/crear-anio-academico/?fecha=${fechaInicio}&cada=${dias}&duracion=${duracion}`, null);
  }

  getNextPeriodo(estado: Estado = Estado.ACTIVO): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/get-next-periodo/?estado=${estado.toString()}`);
  }

  updateEstado(id: number, estado: Estado): Observable<any> {
    return this.httpClient.put(`${this.baseEndPoint}/${id}/update-status/${estado}`, null);
  }

  checkPreviusPeriodos(estado: Estado): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/${estado}/check-status`);
  }

  sincronizar(): Observable<any> {
    return this.httpClient.put(`${this.baseEndPoint}/sincronizar`, null);
  }

  checkPeriodo(): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/check-periodo-cercano`);
  }



}
