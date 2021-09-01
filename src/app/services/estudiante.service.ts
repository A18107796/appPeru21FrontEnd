import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Estudiante } from '../models/estudiante';
import { CommonServiceStatusService } from './common-service-status.service';
import { CommonService } from './common.service';
import { PeriodoService } from './periodo.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService extends CommonServiceStatusService<Estudiante> {

  baseEndPoint = url_spring + 'estudiantes';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  verifyDNI(dni: string): Observable<any> {
    return this.httpClient.get(this.baseEndPoint + "/dni/" + dni);
  }

  findEstudianteBYDNI(dni: string): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/buscar/dni/${dni}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  verifyEmail(email: string): Observable<any> {
    return this.httpClient.get(this.baseEndPoint + "/email/" + email);
  }



}
