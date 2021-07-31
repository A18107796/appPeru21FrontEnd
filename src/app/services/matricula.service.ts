import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { url, url_spring } from 'src/environments/environment';
import { Matricula } from '../models/matricula';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private endpoint = url_spring + "matriculas";
  constructor(private httpClient: HttpClient) {
  }

  matricular(matricula: Matricula): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}/matricular`, matricula);
  }

  getMatricula(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/` + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getMatriculas(): Observable<any> {
    return this.httpClient.get<any>(this.endpoint).pipe(
      map(res => res.sort((a: any, b: any) => a - b))
    );
  }

}
