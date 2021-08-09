import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Estado } from '../enums/estado';
import { MatriculaPagos } from '../models/matricula-pagos';
import { CommonServiceStatusService } from './common-service-status.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaPagoService extends CommonServiceStatusService<MatriculaPagos>{
  baseEndPoint = url_spring + 'matricula-pagos'
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getCercanPago(id: number, estado: Estado = Estado.PENDIENTE): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndPoint}/recent/${id}?estado=${estado.toString()}`);
  }

}
