import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { CountEntity } from '../enums/count-entity';
import { Estado } from '../enums/estado';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseURLEndpoint = url_spring + 'dashboard';
  constructor(private httpClient: HttpClient) { }

  getEspecializacionMasMatriculada(id: number | null): Observable<any> {
    let url = `${this.baseURLEndpoint}/especializaciones/most-matriculas`;
    if (id) {
      return this.httpClient.get<any>(url + "/" + id);
    } else {
      return this.httpClient.get<any>(url);
    }
  }

  getPagosCountStatus(): Observable<any> {
    return this.httpClient.get(`${this.baseURLEndpoint}/pagos/status`);
  }
  getPensionesCountStatus(): Observable<any> {
    return this.httpClient.get(`${this.baseURLEndpoint}/pensiones/status`);
  }

  getCountEntity(entity: CountEntity): Observable<any> {
    return this.httpClient.get(`${this.baseURLEndpoint}/count/?value=${entity.toString()}`);
  }

  getGanancias(): Observable<any> {
    return this.httpClient.get(url_spring + 'pagos/query/total');
  }

  getGananciasByFechas(inicio: string, fin: string): Observable<any> {
    return this.httpClient.get(url_spring + 'pagos/query/filter/' + Estado.PAGADO + "?fecha_inicio=" + inicio + "&fecha_fin=" + fin);
  }


}
