import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Especializacion } from '../models/especializacion';
import { EspecializacionTipo } from '../models/especializacion-tipo';

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService {
  private url: string = url_spring + "especializaciones";
  constructor(private http: HttpClient) {

  }

  getEspecializaciones(): Observable<Especializacion[]> {
    return this.http.get<Especializacion[]>(this.url);
  }
}
