import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Matricula } from '../models/matricula';
import { Pago } from '../models/pago';
import { CommonServiceStatusService } from './common-service-status.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends CommonServiceStatusService<Pago>{
  public _matricula!: Matricula;
  baseEndPoint = url_spring + "pagos";
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  sendMatricula(matricula: Matricula) {
    localStorage.setItem('matricula', JSON.stringify(matricula));
  }

  deleteMatriculaStorage() {
    localStorage.removeItem('matricula');
  }

  returnMatricula(): Matricula | false {
    if (localStorage.getItem('matricula') != null) {
      const matricula = JSON.parse(localStorage.getItem('matricula') || '') as Matricula;
      if (matricula) {
        return matricula;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  getMaxID(): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/max-id`);
  }

  getNumRuc(number: number): string {
    let retNumber = number.toString();
    let vecesBucle = 7 - retNumber.length;

    if (retNumber.length > 7) {
      return "9999999";
    }

    for (let index = 0; index < vecesBucle; index++) {
      retNumber = "0" + retNumber;
    }

    return retNumber;
  }

  anularPago(idPago: number): Observable<any> {
    return this.httpClient.put(`${this.baseEndPoint}/anular-pago/${idPago}`, null);
  }


}
