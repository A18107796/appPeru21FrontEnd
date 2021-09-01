import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { url, url_spring } from 'src/environments/environment';
import { Matricula } from '../models/matricula';
import { CommonServiceStatusService } from './common-service-status.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService extends CommonServiceStatusService<Matricula>{
  baseEndPoint = url_spring + "matriculas";

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  matricular(matricula: Matricula): Observable<any> {
    return this.httpClient.post<any>(`${this.baseEndPoint}/matricular`, matricula);
  }

  getMatricula(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndPoint}/` + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getMatriculaByStudentDNI(dni: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndPoint}/filter/dni/${dni}`).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getMatriculas(): Observable<any> {
    return this.httpClient.get<any>(this.baseEndPoint).pipe(
      map(res => res.sort((a: any, b: any) => a - b))
    );
  }


  getMatriculasByPeriodo(idPeriodo: number): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/periodo/${idPeriodo}`);
  }


  getMatriculasByPeriodoAndEspecializacion(idPeriodo: number, idEsp: number): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/periodo/${idPeriodo}/especializacion/${idEsp}`)
  }

}
